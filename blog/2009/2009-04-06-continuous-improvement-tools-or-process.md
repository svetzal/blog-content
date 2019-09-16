---
title: "Continuous Improvement: Tools or Process?"
date: "2009-04-06"
published: true
---

Any organization who wants to survive needs to realize that they need to implement some level of Continuous Improvement. This is a concept borrowed from the Lean Manufacturing movement, and applies everywhere. You improve, or you stagnate and become irrelevant.

I often run into folks who are absolutely convinced that a new tool will solve their woes. I always try as gently as possible to let them down and help them realize that while a new tool may help but what more likely is broken is their approach to the problem - it's process related. Their old tool may very well fit the new process.

What brings this hope that a tool will help is twofold - one is the tool proponent and their promise of increased productivity. While this likely holds some truth, what's more likely is that _the tool embodies new, more successful processes._

Do you need the tool to do this? Probably not! Does the tool help? Perhaps.

_But why not adopt the processes on their own to make sure they work for you before investing in the tool?_

Here are some ideas of processes in software development and tools that can support them. Remember, it's more important that you adopt the process than these individual tools.

**1\. Effortless Communication**

You want to remove as many barriers to communication between team members as possible. Remember too that your team may be larger than you initially think - programmers, project managers, QA people, business stakeholders, customers, etc. This team DOES extend beyond your organization and you NEED to accommodate that.

Each group of individuals will have their own preferred methods of communicating. Some will prefer email. Some will prefer the telephone. Some will prefer instant-messaging or group chat.

I count this as a larger process that is a composite of smaller processes. Here are some of the processes that we practice:

_a) Daily status (medium size process)_

A standup meeting, 5-10 minutes, during which developers discuss with themselves and their team lead what they're doing and what they plan to do. This is also where they bring up any roadblocks that need to be removed ASAP like knowledge gaps, infrastructure problems, additional guidance or clarification.

We do this on a conference bridge so managers, customers and stakeholders can listen in. There are no minutes or notes taken, this is busy work. If folks want to know what's going on day by day, they dial in.

Tools: Telephone, conference bridge

Risks: If developers do not participate, they lose touch with milestones and day to day progress, causing duplicated efforts or delaying tasks

_b) Iteration status / showoff (weekly or bi-weekly, large size process)_

An in-person meeting between developers, managers and stakeholders. This must be done face to face in order to facilitate effective non-verbal communication and reduce misunderstandings.

This is typically done at a customer site (if they have the meeting facilities and white-board space) or at our office.

The purpose of this meeting is typically two-fold - i) show off the work done in the previous iteration and ii) plan the work to be done in the next iteration.

The result of this meeting is the task list for the next iteration.

Tools: Meeting room, white-boards, computer(s)

Risks: Stakeholders need to understand the work that's been done to-date, if they do not attend time is wasted on duplicating items discussed during this meeting in writing.

_c) Interim communications (small or tiny size processes)_

During an iteration, various interim communications must be made effortless. These include discussion between developers (who may be working together or distributed) and discussion between the team lead and managers and/or stakeholders.

Communication directly between managers and stakeholders and individual developers should be developer initiated only. Stakeholders need information on what's going on so they need to talk to the team lead, attend iteration status meetings, and/or listen in on daily status meetings (not often exercised as they are typically very technical).

Tools: Instant messaging (open over MSN, Yahoo, AIM or closed over  a private Jabber server), group chat (open over a public IRC server, or closed over a private IRC server), telephone, conference bridge (multiple stakeholders / managers / team lead).

Risks: Team lead must communicate road blocks to managers and stakeholders, and managers and stakeholders must act on these road blocks (something isn't getting done until it's removed).

**2\. Issue tracking (small size process)**

Invariably as a project progresses, items that arise that can't be dealt with right away need to be recorded so that they can be revisited and/or confirmed addressed at the iteration status meeting.

Tools: bug tracker (Redmine, Trac, any Wiki)

Risks: issues fall through the cracks, stakeholders feel they're not being taken seriously

**3\. Source-code control (tiny process)**

Developers need to be able to work on the same code-base without getting in each others way - this is what source-code control accomplishes.

These tools need to be well supported by all developers on all the platforms they use. For this reason we typically shy away from any commercial and platform specific source-code control tools as they typically leave some developer out in the cold.

Tools: subversion, mercurial, git

Risks: time wasted merging changes manually

**4\. Testing automation (small size process)**

As developers build code and tests to ensure the code functions, these tests need to be run constantly. The sooner a developer can be told that their change broke something, or that a test was insufficient, the more quickly it can be addressed and the less it slows the project down.

Tools: hudson, cruise-control

Risks: time wasted chasing deeply broken code

Notice that for a software development company, most of those communication tools don't sound particularly high-tech. That's because they're purposefully not. The more complicated or monolithic your tools, the more likely they are to fail you - people won't use them or they're more likely to be unsuitable in certain situations.

Also notice that the more technical the worker, the more software tools are used. The best technical workers have an innate ability to automate the "soul killing" tasks, or the things that piss them off.

Also, note that the smaller the process the more critical it is that it gets done with relentless regularity. This dovetails with my [previous blog about millitasks](http://svetzal.wordpress.com/2009/04/03/the-concept-of-millitasks/). While every one of these processes however are critical in our company to successful project delivery, it's the small and tiny ones that pose the most risk to a successful project.
