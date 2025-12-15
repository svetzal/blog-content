---
title: "There Is No Agility Without Technical Agility"
date: "2022-07-20"
published: true
image: images/tree-bud.jpg
imageAlt: Tree Bud, Stacey Vetzal
tags:
  - agile
  - coaching
  - architecture
  - software-development
  - engineering
---
# There Is No Agility Without Technical Agility

As we wish to adapt continually to an ever-shifting set of stakeholder needs, it is vital that the software and supporting technologies not calcify over time.

Technical agility demands a different software engineering stance than we've used in the past.

In the past, we asked architects to make decisions that would allow us to get more specific. For example, we chose a database system and architecture so we could employ the right specialists to write the appropriate SQL or DDL code.

However, modern software architecture is about accommodating future change, about abstractions that expand our options rather than limit them. A practical architectural stance is to assume that your design is wrong. How would you adjust it so that changing it caused less rework in the future?

Essential concepts like Domain Driven Design have become preferred because the business domain changes more slowly than the underlying technologies used in a system. At its core, banking is about as it was 30 years ago. You sure can't say that about software. Thirty years ago, Java didn't exist.

So, for example, instead of using architectural choices to pick the right specialists and get that SQL and DDL code written right away, we craft a domain entity model that abstracts data persistence. We employ those SQL and DDL specialists only at the edges of the code so that the choice does not limit our internal design.

Before you challenge me that discreet SQL/DDL is archaic, note that your favourite ORM must be treated the same. This applies to any external or vendor technology. You do not want your core code coupled to your favourite ORM, your favourite UI framework, your favourite network or storage framework because that will most certainly change long before the underlying business need.

The stance of designing, then writing, then delivering that software is becoming less and less appropriate with every passing year.

Instead, the expectation is that we build and continually evolve both the design and implementation to suit the needs of our stakeholders. We deploy the software when our stakeholders need it, not after some long technical cycle of ensuring it will work for them.

From emergent design and continuous refactoring to continuous integration to ship at will, we have established practices that allow us to rethink our engineering at the pace of business.

The modern frontier of business agility, continuous product discovery, is now possible. Instead of guessing what the design of a product should be upfront, we continually use real stakeholder feedback on real functioning systems to hone their edge in the market and ensure our competitive advantage.
