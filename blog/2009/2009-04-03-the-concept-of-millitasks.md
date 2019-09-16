---
title: "The Concept of Millitasks"
date: "2009-04-03"
published: true
---

Since I've been back at TWM and getting involved in the day to day operations again, and I'm back on task to formalize our procedures, something has been striking me lately.

Big tasks get in the way of other big tasks unless you break them down. Then you can tend to get more than one thing done by doing mixing the small tasks up.

This is intuitively obvious to most. Don't drive to the store, buy a hook, go home, hang your picture, drive back to the store, buy some wood, go home, build that shelf. You mix the two bigger tasks together to accomplish them together more quickly than you could have consecutively.

Big is a matter of perspective, though. A task typically is comprised of several steps to perform (make tea = boil kettle, put teabag in cup, pour boiling water into cup, wait). Each step can be broken down into component pieces like hand movements and so on.

On a computer, the smallest millitask might be a machine language instruction. In transportation each revolution of a tire.

When it comes to programming, the process of breaking a deliverable (say a website, or an application) down into its individual tasks to assemble can be a very long and drawn out process. In fact, because the time taken to analyze and break down the program can approach or exceed the time taken to build the program once and for all, proponents of Agile development maintain that breaking down the program shouldn't be done in any detail at all.

This is going to be true I think for any field where you deal with a high number of unknowns and undefineds.

But, even for programming, many millitasks remain the same. You type keystrokes on your keyboard. You boot up your development environment. You update, test, commit your code changes. These individual millitasks are known quantities, they take about the same amount of time each time, and that amount of time tends to be small.

A problem can arise however when they bunch up. For example, if you have teams or individuals working in parallel on a code-base you need to scatter the millitasks of update/test/commit regularly throughout your day. The further apart those millitasks are performed, the more chance you have of conflict in your code repository and of a developer having to spend undue amount of time dealing with what would have been simple if the millitasks were done closer together.

How about testing? The further apart you test, the larger the potential for broken code to sidetrack you. Testing can be a millitask. Individual tests can be a millitask. Individual asserts within individual tests can be a millitask. Do more asserts more frequently. Do smaller tests to better isolate potential problems.

The cost of marathon code merge sessions, of tearing apart days of coding to fix a broken test, can be enormous.

The goal of your collaborative development environment is to have these millitasks performed as close together as possible and to make them as painless as possible.

To do this -

Make your source-code repository easily accessible and understandable to your developers, and encourage them to commit often. That will help them build small pieces of code, write a test for the code, and commit the test + code. If they're committing less than twice a day something's wrong. Less than daily, something's terribly wrong. Use branches to isolate risky changes but keep them small, evaluate them quickly and get them integrated. If something's taking too long, it's too big and should be broken down.

Use Continuous Integration to make sure as many tests are run as possible as close to your developer commits as possible. Don't let a developer commit as the very last task of their day - if they break the build they need to fix it.

And automate as many millitasks as you can so that they don't become gruntwork or distraction for your developers and they can perform them effortlessly as they go so they don't pile up. Automate branch merges and email team leads on conflict. Automate closing bugs in your bugtracker when the fixes are committed.

Identify the millitasks in your environment and see what should be done more frequently, automated, or done together instead of separately. Find what's eating your developers' time and think about the problem in terms of millitasks, it might give you some ideas.

Also, when you look afterwards (not too long afterwards! that's a millitask!) at certain millitasks you may find they become Key Performance Indicators (KPIs) of your environment as a whole and can help identify problems. Certainly you can monitor when they become too far apart and could cause general inefficiencies but you can also use them to identify specific blocks like training issues (developer over their head) or environmental issues (disruptive influence), or star employees (never broke the build).
