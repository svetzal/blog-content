---
tags:
  - agile
  - coaching
  - developer
  - coding
imageAlt: A woman at a computer, using her phone and keyboard
image: images/boundaries.png
published: true
date: 2025-02-23
title: What Is a Developer? Part 2 - Test Boundaries
---
The [seed for this article series is here](https://stacey.vetzal.com/2025/2025-02-12-what-is-a-developer/), it's long and a bit ranty, but I wanted to draw a bunch of ideas into one place that we could explore in more depth over some follow-up posts. I'm going to be doing some of these articles in an odd order, it's my blog, I make the rules!

Really, though, I often will talk about code boundaries in situations where I'm not actively sitting around code to point at with people. It makes the boundaries discussion pretty abstract. That part of my prior post also generated the most direct questions, so I want to tackle this testing discussion first.

So, coding is design. I have a post somewhere that basically says "there's no such thing as implementation" because implementation is simply the emergence of the design of the code that solves the problem at hand. There's a lot more I can go into here, but it's not central to the point of this post.

## Example 1

Let's look at two code examples. Here's the first.

```java
public class OrderService {

    private final InventoryRepository inventoryRepository;
    private final PaymentGateway paymentGateway;

    public OrderService(InventoryRepository inventoryRepository, PaymentGateway paymentGateway) {
        this.inventoryRepository = inventoryRepository;
        this.paymentGateway = paymentGateway;
    }

    /**
     * Returns true if the order is placed successfully, false otherwise.
     * Implementation is coupled to how we get/update stock and charge payment.
     */
    public boolean placeOrder(String productId, int quantity, String userId, double pricePerItem) {
        int currentStock = inventoryRepository.getStock(productId);
        if (currentStock < quantity) {
            return false;
        }
        inventoryRepository.updateStock(productId, currentStock - quantity);

        double amount = quantity * pricePerItem;
        boolean charged = paymentGateway.charge(userId, amount);
        return charged;
    }
}
```

How do we test it? Well, the code has some obvious boundaries. The implementation is contained in the `OrderService` class and we have this handy `placeOrder` method.

Let's check our happy path:

```java
@Test
public void testPlaceOrder_Success() {
    // We're setting things up here, thank you Mockito
	when(inventoryRepository.getStock("PRODUCT123")).thenReturn(10);
	when(paymentGateway.charge("USER123", 20.0)).thenReturn(true);

    // We're going to call the subject under test
	boolean success = orderService.placeOrder("PRODUCT123", 2, "USER123", 10.0);

    // This is the happy path after all
	assertTrue("Expected the order to be placed successfully", success);

	// But did it do all the other stuff it needed to do? We'll need to check...
	verify(inventoryRepository).getStock("PRODUCT123");
	verify(inventoryRepository).updateStock("PRODUCT123", 8);
	verify(paymentGateway).charge("USER123", 20.0);
}
```

And what about when there isn't enough stock:

```java
@Test
public void testPlaceOrder_InsufficientStock() {
    // Only 1 in stock
	when(inventoryRepository.getStock("PRODUCT123")).thenReturn(1);

    // Let's try and order 2 of them
	boolean success = orderService.placeOrder("PRODUCT123", 2, "USER123", 10.0);

    // That shouldn't work...
	assertFalse("Expected the order to fail due to insufficient stock", success);

	// Verifies no update/charge calls were made
	verify(inventoryRepository, never()).updateStock(anyString(), anyInt());
	verify(paymentGateway, never()).charge(anyString(), anyDouble());
}
```

And what about when the payment fails:

```java
@Test
public void testPlaceOrder_PaymentFails() {
	when(inventoryRepository.getStock("PRODUCT123")).thenReturn(5);
	when(paymentGateway.charge("USER123", 20.0)).thenReturn(false);

	boolean success = orderService.placeOrder("PRODUCT123", 2, "USER123", 10.0);

	assertFalse("Expected the order to fail due to payment failure", success);

	// Verifies updateStock was called, but payment was unsuccessful
	verify(inventoryRepository).updateStock("PRODUCT123", 3);
	verify(paymentGateway).charge("USER123", 20.0);
}
```

This all seems to make a lot of sense.

But can you spot the challenges? I'll give you a minute. Take your time.

Yes, you've got it, the tests know an awful lot about the internals of the `placeOrder` method, we kind of have to. See those checks to verify `updateStock` and `charge` were called (or not called) correctly?

The challenge here is that we need to know how `placeOrder` interacts with both the `inventoryRepository` as well as the `paymentGateway` in order to validate that it did the right thing from a business perspective.

Yes, yes, I know, the `when` statements also couple us into some of the behaviour of the our dependencies. I'm trying to have a simple example here. Please suspend for a moment.

## Example 2

Now, let's consider some different boundaries. I'm taking a cue here from Ivar Jacobsen and [an old book he wrote](https://www.amazon.ca/Object-Oriented-Software-Engineering-Approach/dp/0201544350) over 30 years ago that seems to have been forgotten. *Actually, I didn't take the cue - rather ChatGPT did. I just noticed the dots that it connected, because I use Use Case Oriented Design frequently, but that's a different blog post.*

Consider this implementation:

```java
public class PlaceOrderUseCase {

    private final InventoryService inventoryService;
    private final PaymentService paymentService;

    public PlaceOrderUseCase(InventoryService inventoryService, PaymentService paymentService) {
        this.inventoryService = inventoryService;
        this.paymentService = paymentService;
    }

    /**
     * Places an order, throws IllegalStateException if stock or payment fails.
     */
    public Order placeOrder(String productId, int quantity, String userId, double pricePerItem) {
        // Check stock
        if (!inventoryService.hasSufficientStock(productId, quantity)) {
            throw new IllegalStateException("Insufficient stock for product: " + productId);
        }

        // Create the domain record
        double totalPrice = quantity * pricePerItem;
        Order order = new Order(productId, quantity, totalPrice);

        // Update stock
        inventoryService.decrementStock(productId, quantity);

        // Take payment
        boolean paymentSucceeded = paymentService.chargePayment(userId, totalPrice);
        if (!paymentSucceeded) {
            throw new IllegalStateException("Payment failed for user: " + userId);
        }

        // Mark paid and fulfill
        order = order.markPaid();
        order = order.fulfill();

        return order;
    }
}
```

What are the differences you notice?

Let's look at our happy path test:

```java
@Test
public void testPlaceOrder_Success() {
	// Set up for the happy path here, thanks again Mockito
	when(inventoryService.hasSufficientStock("PRODUCT123", 2)).thenReturn(true);
	when(paymentService.chargePayment("USER123", 20.0)).thenReturn(true);

	// Let's call the subject under test
	Order order = placeOrderUseCase.placeOrder("PRODUCT123", 2, "USER123", 10.0);

    // And now let's check the state of the order
	assertEquals("PRODUCT123", order.productId());
	assertEquals(2, order.quantity());
	assertEquals(20.0, order.totalPrice(), 0.0001);
	assertTrue(order.paid());
	assertTrue(order.fulfilled());
}
```

Wait, why didn't we have to check any internal method calls were made to the `inventoryService` or `paymentService`?

Well, let's look at how we'd test some of the sad paths:

```java
@Test(expected = OutOfInventoryException.class)
public void testPlaceOrder_InsufficientStock() {
    // Instruct the inventoryService to report not enough stock
	when(inventoryService.hasSufficientStock("PRODUCT123", 2)).thenReturn(false);

    // Let's call the subject under test
	placeOrderUseCase.placeOrder("PRODUCT123", 2, "USER123", 10.0);

	// Expects an exception, no further assertions needed
	// Wait, wat?
}
```

Yes, that's right. Instead of having to know about the internals of the `placeOrder` method, we ***externalized*** the specific check we're trying to make by making it an exception - we ***made a better boundary*** to check.

Same with the second sad path:

```java
@Test(expected = PaymentFailureException.class)
public void testPlaceOrder_PaymentFails() {
	when(inventoryService.hasSufficientStock("PRODUCT123", 2)).thenReturn(true);
	when(paymentService.chargePayment("USER123", 20.0)).thenReturn(false);

	placeOrderUseCase.placeOrder("PRODUCT123", 2, "USER123", 10.0);

	// Expects an exception, no further assertions needed
}
```

We no longer require any internal knowledge of how `placeOrder` works. This means many things.

Consider if we needed to change how inventory management works? Example 1 would break, and Example 2 wouldn't. Also, with any additional conditions that change the implementation of `placeOrder` we'd have to seek those out and expose them in Example 1's tests, making them even more brittle and prone to breakage.

This is the foundation of "how not to hate your test suite" - don't design code that forces you to write brittle tests. Use good Object-Oriented design tactics like encapsulation and information hiding. If you've ever wondered how to test a private method, you've probably walked yourself into a poor design. You shouldn't have to. (Private methods are the programmer equivalent of **keep out, you have no business knowing how this works***).

The second example doesn't care how the condition occurred that threw the exception, those details were irrelevant to the business case. You don't need to know about the implementation in order to know whether the specific failure was due to lack of inventory, or a failed payment.

In the second example, we made the business contract explicit, with a method call delineating responsibility, as well as two specific failure conditions. **And we tested that business contract**, not the implementation inside `placeOrder`.

From a higher perspective, we tested the behaviour, not the implementation.

Are Exceptions the only way to do this? No of course not, there are a variety of techniques you can use to achieve better boundaries, we could explore the Use Case Oriented Design further, we could explore different ways of orchestrating all the steps that need to happen as part of an order transaction, but this was plain and simple, and illustrates the point that the design of the boundaries is important, and ***has a material impact on the efficacy and maintainability of your tests***.

The second example does some things differently, the code is less imperative than the first, the use-case oriented design, it also uses immutability to its benefit, and all of that is good, but the important thing to draw from this is the boundary change for the purpose of this particular post.

How does a developer come to know how to write code like the second example? Well, I'd say experience, but experience is not the same as the number of years they've been coding. Experience is borne from the problems they've had to solve, and the advice and mentorship of others. The impact this has at a higher scale is in how fast projects in your organization go from green-field to brown-field.

## Aside

I mentioned earlier, I asked ChatGPT to formulate some of this example code. Would it surprise you to learn it took several prompts?

Here they are:

> I am trying to demonstrate the importance of designing good boundaries in code. There are a number of points I try and make:
> - if we accidentally test the implementation rather than intent, whenever we make changes to the implementation, we will have broken tests
> - business domain is more stable than technical domain, so if we test across business domain boundaries, tests will change less often
> 
> Can you craft me two examples, code plus tests, that demonstrate the same functionality - one with technology oriented boundaries, and one with business domain oriented boundaries, that demonstrate poor and good testing accordingly.

Not surprisingly, I was unhappy with its first response. I have little tolerance for needless boilerplate code. And I didn't specify a language, so it chose Java, boilerplate + Java are long time bedfellows.

> I like it, but change those JavaBeans with getters and setters over to use records instead, make good use of Java21+

It iterated, and I saw a few more things I didn't like. It had hand-built some functional test-doubles with some spy behaviour, which were nice, but it was a lot of code for a blog post.

> I'm not sure I'm keen on those complicated fakes in the "good" example, can you trim back the dependence on that? I'd like the two examples to be as symmetrical as possible except for the choice of testing boundary.

And then I still tuned the code it wrote for me for this blog post, like the business-derived Exception classes.

And, I suppose some would argue with me about my choice of using exceptions, rather than return values, look it's Java. In the Java realm, exceptions are a big part of design, and I don't think it's unreasonable to have them participate in the business domain. I kind of like the cleanliness of it. An example in, say, Go might have been interesting, but I left it in Java because an awful lot more people know Java than Go, let alone the lineage of this whole exception vs return value argument!

## Finishing up

My point is this, code design takes more than time. I'm reminded of the phrase, "Practice doesn't make perfect. Perfect practice makes perfect."

Developers rarely come with this experience. (And, even if they do, does your environment encourage them to evolve from the first approach to the second, or do we just say it's done and ship it? But that's yet another blog post.).

It's having slack in our schedule, plus availability of mentorship, plus a culture normalized around growth and improvement that encourages our code to arrive at the better designs. And, incidentally, this is also a great recipe for talent attraction and retention. And there's yet another post.

Let's wrap up this testing boundaries post before I really fall off the rails!