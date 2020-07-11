---
title: "What is an Agile Technical Practices Coach?"
date: "2017-07-14"
published: true
---

### The Past

Software development today is very different than 10 years ago, and worlds apart from what it was 20 years ago.

20 years ago, we wrote software and shipped it out on disk or CD-ROM. People expected new versions of the software they used, say Microsoft Word, every 2-3 years. Our timelines were long, and we had development practices that matched that. People would request a feature, and 2-3 years later it would appear. Maybe you were really responsive and it was 6 months to a year.

### The Present

Today, the companies that do it best ship new code every few seconds. They don’t ship much that’s new every few seconds, the updates are smaller, but they flow.

To ship software like this takes a monumental shift in how you build it from what many of us learned.

Much of that shift happens at the organizational level. How do we reshape our business processes to make sure we gather feedback from users, streamline it to the development team, and get it deployed to the world. In this regard, our industry has done fairly well - many organizations ship web-based and mobile software on a timescale of weeks rather than months.

Much of that shift also happens, however, at the code level.

If you’re still coding like we were 20 years ago, you’re not going to be able to keep pace.

Pushing hard things off to do “later” or cutting corners that we’ll fix “later” is especially dangerous, because when “later” arrives you’ll be at least as pressed for time as you are now.

### Core Practices

So what are the core practices of an Agile Technical Practices Coach?

Many of our best practices were actually envisioned 20 years ago by Kent Beck, Ward Cunningham, Ron Jeffries, and others. They so strongly resonated with the development community that Extreme Programming (XP) was born.

Today the following practices have survived the test of time:

- Pair Programming builds higher quality code that requires less rework, and spreads knowledge of the codebase throughout your team, thereby reducing risk
- Test-driven development (TDD) guides developers to build code that can be tested, because most code we have out there is literally untestable. TDD’s test, build, refactor cycle (or what developers call “red, green, refactor”) provides a place to centre several other practices
    - the cycle spins every few minutes, so you’re never more than a few minutes away from when everything was working
    - you commit changes to source control, providing a steady stream of small changes that are easier to merge together, and most importantly a short log message explaining them
    - you refactor your code so that it is better organized, has less duplication, and is as small as it should be
- Refactoring helps you reshape the code underneath the boundaries that make business sense, bringing you independent developability and independent deployability, helping you release more often and divide work between teams; this is different than restructuring which is riskier but lets us reshape those boundaries to align with business needs
- Automated testing provides assurances that the code written still works (unit tests), that the systems built from the code still work (integration testing), and that your product still works (acceptance testing)
- Practice (coding kata) is a way for developers to build skills outside your codebase. With practice and repetition comes confidence and skill, so let developers learn outside of the code you deliver to your customers.

Knowing these practices at an intellectual level, and putting them into play every day are two different things.

### The Coaching

As a coach, it’s my job to help developers put these practices into play. Watch their body language as they pair program. Scan their commit logs and help them write better messages. Help them understand the boundaries in their code so they can use refactoring to make them clearer.

So, as a coach, I layer the following on top of the technical practices work:

- assess the team, their mix of skills, and their needs
- provide actionable recommendations for change based upon the tangible things that I see in your organization
- ensure that the execution of those changes goes smoothly, they are internalized by the team, and then repeat this process as necessary

Your codebase is an investment, and you need it to be working for you. The sooner you can put features in front of customers, the sooner you can begin realizing a return on that investment.
