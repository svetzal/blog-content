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
I'm going to be doing some of these articles in an odd order, it's my blog, I make the rules!

Really, though, I often will talk about code boundaries in situations where I'm not actively sitting around code to point at with people. It makes the boundaries discussion pretty abstract. As such, I want to tackle the testing discussion first.

So, coding is design. I have a post somewhere that basically says "there's no such thing as implementation" because implementation is simply the emergence of the design of the code that solves the problem at hand. There's a lot more I can go into here, but it's not central to the point of this post.

Let's look at two code examples.

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

How do we test it? Well, the code has some obvious boundaries. The implementation is contained in the `OrderService` and we have this handy `placeOrder` method.

Now, let's check our happy path:

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

Yes, you've got it, the tests know an awful lot about the internals of the `placeOrder` method, we kind of have to. We need to know how it interacts with both the `inventoryRepository` as well as the `paymentGateway` in order to validate that it performed the steps we needed it to from a business perspective. Mocking those out was our only real choice to inspect those internals and ensure it did the right thing.

Now, let's consider a different set of boundaries. I'm taking a bit of a cue here from Ivar Jacobsen and a book he wrote over 30 years ago that seems to have been forgotten. Well, actually, I didn't - rather ChatGPT did, I just saw the dots that it connected, but that's another post as well.

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

Wait, why didn't we have to check any internal method calls from the `inventoryService` or `paymentService`?

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

Yes, that's right. Instead of having to know about the internals of the `placeOrder` method, we externalized the specific check we're trying to make by making it an exception - we made a better boundary to check.

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

What if there were other more complex conditions for the order to fail due to inventory? So every time we change how inventory management works, we have to change that test as well. And maybe the test failed to remind us to fix it, but maybe it didn't and we have let a bug through.

But the second example? It doesn't care how the condition occurred, it doesn't need to know about the implementation in order to know that the specific failure was due to lack of inventory, or a failed payment.

In the second example, we made the business contract explicit, with a method call delineating responsibility, as well as two specific failure conditions. And we tested that business contract, not the implementation inside `placeOrder`.

In other words, we tested the behaviour, not the implementation.

Are Exceptions the only way to do this? No of course not, there are a variety of techniques you can use to achieve better boundaries, we could explore the Use Case Oriented Design further, we could explore different ways of orchestrating all the steps that need to happen as part of an order transaction, but this was plain and simple, and illustrates the point that the design of the boundaries is important, and has a material impact on the efficacy and maintainability of your tests.

How does a developer come to know how to write code like the second example? Well, I'd say experience, but experience is not the same as the number of years they've been coding. Experience is borne from the problems they've had to solve, and the advice and mentorship of others.

I mentioned earlier, I asked ChatGPT to formulate much of this example code. Would it surprise you to learn it took several prompts?

Here they are:

> I am trying to demonstrate the importance of designing good boundaries in code. There are a number of points I try and make:
> - if we accidentally test the implementation rather than intent, whenever we make changes to the implementation, we will have broken tests
> - business domain is more stable than technical domain, so if we test across business domain boundaries, tests will change less often
> 
> Can you craft me two examples, code plus tests, that demonstrate the same functionality - one with technology oriented boundaries, and one with business domain oriented boundaries, that demonstrate poor and good testing accordingly.

Not surprisingly, I was unhappy with its first response. I have little tolerance for needless boilerplate code.

> I like it, but change those JavaBeans with getters and setters over to use records instead, make good use of Java21+

I saw a few more things I didn't like.

> I'm not sure I'm keen on those complicated fakes in the "good" example, can you trim back the dependence on that? I'd like the two examples to be as symmetrical as possible except for the choice of testing boundary.

And then I still tuned the code it wrote for me for this blog post.

My point is this, code design takes more than time. I'm reminded of the phrase, "Practice doesn't make perfect. Perfect practice makes perfect."

Developers rarely come with this experience. (And, even if they do, does your environment encourage them to evolve from the first approach to the second, or do we just say it's done and ship it? But that's yet another blog post.).

It's having slack in our schedule, plus availability of mentorship, plus a culture normalized around growth and improvement that encourages our code to arrive at the better designs. And, incidentally, this is also a great recipe for talent attraction and retention. And there's yet another post.

Let's wrap up this testing boundaries post before I really fall off the rails!