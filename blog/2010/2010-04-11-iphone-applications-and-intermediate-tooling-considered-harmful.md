---
title: "iPhone Applications and Intermediate Tooling Considered Harmful"
date: "2010-04-11"
published: true
---

I have to say, I admire Steve Jobs for taking the hard line on so many issues. It isn't easy, and he's sure taking the flack for it these days. I'm reminded of Derek Sivers' [recent TED talk on starting a movement](http://www.ted.com/talks/derek_sivers_how_to_start_a_movement.html). Apple generally isn't afraid to be the lone crazy out there.

I've been involved as a user and as a developer in projects in the past providing intermediate tooling. That is, a software tool that produces a template or even finished code for a different software tool. From Maven archetypes for Java to code-generators for UI, from Flash generators to iKVM.

Believe me, it's no bed of roses. About all they've ever accomplished is to allow someone to take what they know about Environment A and find some mapping of that to what they don't know about Environment B.

The trouble is, the mapping between Environment A and Environment B is "lossy" - and on a platform like iPhone it's like JPEG compression at 10% quality.

You could argue that the intermediate tooling can "narrow down" its focus to a subset of a particular problem domain. Like a game generator that builds "Sim-X" style games, you just change the calculations some and provide different graphics. Likely it could get a much better match between Environment A and Environment B by not trying to be everything to every developer.

The problem with this approach is you get a very homogenous set of Apps being published that all basically look and work the same.

Then there's the issue of keeping the intermediate tooling up to speed with the latest enhancements in the target platform. There's an inherent lag here because you can't QA or sometimes even start building your tooling until that platform is in production. By then you've got frustrated users in the field who can't use the features they want, or worst-case have crashing generated applications because your generator built "bad" code.

Jobs doesn't want a bunch of crappy or duplicate applications in his App Store. I wouldn't either. He wants useful applications with a high-quality end-user experience. Would you rather fish through a sea of 15 crappy apps to find the 1 gem in the mix that was hand-tooled from the ground up, or would you rather just grab the 1 gem and get to work?

I'm reminded of one of our favourite quotes at TWM:

_"To become over-familiar with one weapon is as much a fault as not knowing it sufficiently well."_ -Miyamoto Musashi

We always urge our developers to expand their base of knowledge. Every new programming language and environment they learn makes them a better programmer in _all of the environments_ they know.

**If you are so tied to one environment that you refuse to learn well any other, you are not reaching your potential and I guarantee you are producing substandard work even in the environment you feel you have mastered.**

If you want an environment of useful and successful software, you don't lower your standards to get it - you raise them.
