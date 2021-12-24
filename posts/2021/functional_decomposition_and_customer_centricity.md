---
title: "Functional Decomposition and Customer Centricity"
date: "2021-08-01"
published: true
tags: ["business", "design"]
---

When we use Functional Decomposition to break down efforts on a software development project, we work through how a system needs to work in order to accomplish some technical capability.

## Technology and Technologists

As systems are created and evolve, they typically become a composition of different subsystems. Think of a mobile app, a web service, a database schema, a visual design. There are likely more, but let's pretend the world's a little simpler for a moment.

On a cross-functional team, one where we have different people with different systemic specializations, we may have an app developer working in Swift, an app developer working in Kotlin, a services developer working in Python, a visual designer working in Figma.

Each technology introduces bias to how the implementation will be done, that Python developer maybe used to use Java on an app server, and now they use Lambda Functions in AWS. Maybe they moved from an Oracle RDBMS to MongoDB. That iOS developer used to use Storyboards and now they are using Swift UI. That visual designer used to use Illustrator and now they're using Figma components.

This is the way of our technology field, it relentlessly advances. We might resist these changes for a time, but it will tend to get harder over time for many reasons - vendors deprecate functionality and drop support, it gets harder to find people familiar with the older type of work, newer technologies are incompatible with the older technologies. These external factors force us to change and adapt.

Each of these technologies models an aspect of the implementation in different ways.

Even within a particular technology, take React for example. For a while, the norm was to take an object-oriented approach to React development. While that's still possible, the React community firmly embraced a functional programming style a number of years ago. These require very different ways of thinking about an application's structure.

## The Impedence Mismatch

OK, back to functional decomposition.

Think about these might be currently expressed. Do you use process flows?

Process flows are tempting, because they seem simple. They illustrate a chain of events or actions. And here's where we may start to run into trouble.

Process flows don't translate directly to either a functional nor an object-oriented programming style, but they do translate well to a procedural style.

Couple this with a strong delivery mindset, and you tend to end up with an environment where people take the easiest and quickest approach to system development. You end up with procedural code in your object-oriented programming language. You end up with a bucket of web service calls that struggle to feel like an API.

And that's not at all like getting chocolate in your peanut butter. It's more like getting spaghetti sauce in your cheesecake.

I'd like to propose that two things can help you avoid this kind of situation.

## Customer Centricity

 Consider decomposing the problem in a customer-centric way. Instead of systemic operations like create/read/update/delete, consider the end-user narrative. Why are they deleting this record? Does that real-life situation imply something else is going on than a simple "delete this row from the database"?
 
 Tell stories about why users need to accomplish these new things we want our systems to facilitate.
 
 The one where a customer changed their cell phone provider, and now needs to add a new payee in their banking system.
 
 This sounds maybe like a simple "create" operation, and maybe that's your minimum viable change. But think of the opportunities around it to improve your customer experience. Do they want to be alerted if their old cell phone provider accidentally debits the next month's payment? Now suddenly that shiny new "delete payee" web service endpoint is seen in a completely new light. Does the "DELETE" http operation fully apply anymore?
 
 In an increasingly competitive world, getting past the minimum viable product is critical. Striving for mediocrity in your product will be met with mediocre success unless you're creating a unique product to begin with.
 
Give your team space and opportunity to consider the customer first, and the system second. This will bias how they model and implement the minimum viable change, and just might make future change easier.

Systems will always be under pressure to change, the technologies underlying our businesses change relentlessly.

Paying bills, however, well I've thought about this the same across dozens of technological shifts during my career.

## Anchor Bias

If I asked you how bad you thought that apple you just ate tasted, you would literally first consider how bad it was before your brain kicked in to interrupt and say "actually, it was quite tasty." I had a friend once who loved going to yard sales, his signature question was along the lines of, "How much do you want for that $2 toaster?"

Anchor Bias is an insidious cognitive bias we all experience. Like all cognitive biases, when we're under pressure or anxious, we fall prey more often than not.

A process, procedurally laid out, will yield a procedural implementation under delivery pressure. Especially if the process is laid out in terms aligned with the operation of an existing system after functional decomposition.

However, a process, procedurally laid out, from the perspective of the customer will not tend to model any particular system in the beginning (at least until you've worked this way for a while.)

This really helps that brain interuption happen sooner and more strongly.

It opens the door at a high level for folks to model the customer domain directly. Techniques like Domain Driven Design and Event Storming have emerged in the past decade specifically to elevate this activity and help us build more customer-centric systems.

On a cross functional team, this opens the floor for the app developers, services developers, designers, testers, all to come together and find technological models that better fit both each other and the domain model, the context in which the business and customer operates.

This collaborative approach to solution architecture is very different than what we used to depend on, where it was often done mostly from the perspective of the systems involved, and then dictated to the individual disciplines to accomodate.

## Conclusion

Hopefully I've given you some things to think about, some insight into a way of working that can improve not only customer outcomes, but also how your team might work together to accomplish them.