---
title: London and Chicago Style TDD, A Design Perspective
date: 2024-06-23
published: true
image: images/tdd-design-perspective.png
imageAlt: A mesh rendering of a woman at a computer, on an abstract cyberpunk-style line background
tags:
  - agile
  - coaching
  - developer
  - coding
---

# London and Chicago Style TDD, A Design Perspective

In the field of TDD, two primary schools of thought have emerged, that are often used in tandem. [In this video series, Robert C. Martin and Sandro Mancuso debate](https://cleancoders.com/series/comparativeDesign) the merits of each - concluding that to execute only one exclusively is not the most effective course of action.

At Agile Coach Camp Canada, in my "We Are All Designers" topic, I drew parallels to [Christopher Alexander](https://en.wikipedia.org/wiki/Christopher_Alexander)'s work in the design space.

In "[Notes on the Synthesis of Form](https://en.wikipedia.org/wiki/Notes_on_the_Synthesis_of_Form)," Christopher Alexander discusses two kinds of design strategies: **unselfconscious design** and **selfconscious design**.

## Unselfconscious Design and London Style TDD

**Unselfconscious design** is characterized by its evolution through tradition and cultural practices. In the broader design field, it is typically found in vernacular or indigenous design, where forms and solutions have evolved organically over time to fit the specific needs and constraints of a community.

When designing in this way, the designer is usually unaware of the underlying principles and theories governing their decisions. The design process is intuitive, based on trial and error, and deeply embedded in the social fabric.

The resulting forms are often highly functional and well-adapted to their environment, but the process lacks formalization and explicit understanding.

From a code perspective, this is like the synthesis of new code from abstract thoughts. In London style TDD as we work top-down on the code, from abstraction to concretion, this helps us flesh out the entities and actors needed through how the problem seems to demand their interaction.

From an architectural perspective, this style of TDD provides focus on the boundaries between the elements of the software system. In essence, perhaps, **what the system does.**

London style TDD is sometimes referred to as Top-Down TDD, or Outside-In TDD.

## Selfconscious Design and Chicago Style TDD

In contrast, **selfconscious design** is more analytical and deliberate, often associated with modern design practices. Designers using this strategy rely on explicit knowledge, theories, and systematic methods to solve design problems.

When designing in this way, the designer is acutely aware of the design process, utilizing formal education, research, and rational problem-solving techniques. This method often involves breaking down a design problem into smaller components, analyzing each part, and then composing a coherent solution from those parts.

While selfconscious design can lead to innovative and sophisticated solutions, it can also result in designs that are less organically integrated with their context compared to unselfconscious design.

From a code perspective, this is like the composition of new capabilities from concrete implementations. In Chicago style TDD, indeed we start by creating these concrete implementations first, with the intention of eventually composing them to form the intended solution.

From an architectural perspective, this style of TDD encourages focus on **how the system does what it does.**

## Building Software

Writing software is truly the coming together of how we will solve a problem, and actually solving it.

While we codify the entities and actors of the system, we have an opportunity to directly represent the business domain in the design of the system. From an Object Oriented Design standpoint, these Entities and Actors abstractions could be leveraged across the business domain, bringing coherence and possibly even cohesion (if we group these abstractions together) in our ultimate design.

Tests written from this perspective support the business domain, and whether the software system can satisfy the business and stakeholder requirements.

These tests will often leverage test-doubles, so that we can avoid getting lost in the details of how specifically we will implement the solution, holding our cognitive attention to the system structure and its ability to succeed.

Imagine the following simple software, forgive it's awkwardness as it is written specifically to illustrate this point:

```python
class CartTests(TestCase):
	def test_cart_can_calculate_total:
		# We use a test-double
		multiplier = Mock()
	
		# Given we have a cart with 2x $5 items in it
		cart = Cart(
			[
				CartItem(quantity: 2, price: 5.0)
			]
		)
	
		# When we ask the cart to total itself
		# (notice at this time we don't really care about the specific answer)
		_ = cart.calculate_total(multiplier)
	
		# Then the total should have been calculated from the quantity and price
		multiplier.assert_called_once_with(2, 5.0)


class Cart:
	# Leaving out other implementation code above
	
	def calculate_total(self, multiplier):
		total = 0
		for item in self.items:
			total = total + multiplier(item.quantity, item.price)
		return total
```

Ignoring the obvious simplity implied in the `multiply` function, when taking a top-down approach to the design of this code, we want to avoid getting lost in the next-abstraction down - in this case the implementation of the `multiply` function - so that we can stay focused on the behaviour of the cart.

The flow of our work may benefit from avoiding this context switch.

Eventually, we will have to implement the multiply method.

```python
class MultiplierTests(TestCase):
	def test_can_multiply_two_by_five_as_10():
		# Given we have 2 things at $5 ea
		quantity = 2
		price = 5.0

		# When we are asked to multiply quantity and price
		result = multiplier(quantity, price)

		# Then we should get $10
		self.assertEqual(result, 10.0)

def multiplier(quantity, price):
	return quantity * price
```

While we codify the meaty implementations of the system, how we choose to have it actually do its job, these concretions are specific. We are no longer dealing with abstractions, so we can be explicit and avoid any test doubles.

In reality, we will need to continue to leverage abstractions to avoid having to have some database or remote service or disk or screen, so that we can run our tests in isolation. This `multiplier` function example was chosen for its simplicity and to illustrate our point.

In the end, which test you chose to write first indicated whether you were using the bottom-up thinking of Chicago style, or the top-down thinking of London style TDD.

## Things of Note

Design is complex and organic, a developer's choice in the moment whether to synthesize from concepts or compose from concretions will be something driven by intuition and their desire to stay "in flow."

Ultimately, the **most stable tests over time** will likely be those that validate the system's behaviour across the business domain, as encouraged by synthesis through abstractions.

- This somewhat parallels the Stable Abstractions Principle, in that the more abstract something is, the more stable over time it is likely to be
- It is also likely (but not a given) that the business domain will shift less frequently than the technology of implementation, which will also tend to stabilize these tests

You may choose to retain some concretion tests, those first written in Chicago style, in areas where you wish to support developers' technological concerns. The more you retain, however, the more tests you may have to change as your implementation changes.

- Ultimately, the most stable tests will test **what the system does** rather than **how it does it**
- Tests that validate **how it does it** will change every time we change **how it does it**

## Caveat Emptor

These are the noodlings from my own brain. I do this on top of all the experience I've gained in writing software over a few decades, and all that I've learned from others in this space. We all stand on the shoulders of those who came before.

Along this exploration, these people include Christopher Alexander, Martin Fowler, Robert Martin, Dan North, and likely others.

While the ideas here seem intuitively true from my perspective, drawn from my own experiences in the code I've writen, I cannot say for sure whether this will be true of your own experience. I welcome feedback!

Happy Coding!
