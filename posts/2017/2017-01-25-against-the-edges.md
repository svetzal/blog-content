---
title: "Testing Against The Edges"
date: "2017-01-25"
published: true
---

I have found a new thing.

A test culture so pervasive and intrinsic that they want to test **everything**.

So much so that they have chosen an implementation path that avoids as much coupling as possible to their third-party framework, and even restricts how they use that third party framework.

We hit an implementation challenge where they need to use the framework differently, in a way that forces them to want to mock the framework to build their tests. And now they're pushing back against an industry accepted pattern because they don't know how to test it.

They've finally hit that boundary they've dodged and weaved around for so long.

There's a mantra we sometimes use in test-driven development, "don't mock what you don't own". It's a useful check to see if you've hit a third-party boundary like this.

So if you can't mock what you don't own, what do you do?

You make your contact with that boundary as thin as possible. That's what you do. Refactor that out until it's paper thin. And here's the kicker.

Don't test it.

Yup, that's right. What's the incremental value in achieving test coverage on that boundary? I'd tend to bet it's pretty low. If it's not, I bet you have more to extract from that interfacing.

You might be tempted to implement some vendor-specific harnessing to achieve testing of that boundary. Sure you can adopt that, but same rules apply. It's another boundary to a third-party system - make it as absolutely thin as you can.

The reality these days, especially if you have contact in the chaos that is Javascript development, is that this world moves damn fast. That vendor needs to  update their framework to maintain their income stream, or "to stay current", or "because the new maintainer has a different vision", or for whatever reason.

When that vendor layer changes, or you change vendors, you want to deal with as thin a spill to clean up as possible.

Whether you follow "don't mock what you don't own" or not, watch those boundaries, and don't fall off the edge.
