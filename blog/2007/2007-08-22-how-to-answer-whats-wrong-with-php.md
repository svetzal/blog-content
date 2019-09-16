---
title: "How to answer 'What's wrong with PHP?'"
date: "2007-08-22"
published: true
---

I spec'd a new project the other day. Nothing new, we do this all the time, probably a few dozen times a year. We went through the usual round of analysis, what kinds of people would use the system, what screens would it have, and what entities (types of data) it would need. In the end we settled on the amount of time each element would take, compiled up a total estimate, and created a proposal for the customer.

Throughout the process, as often happens, there was a conversation like this.

- "The customer has mentioned PHP, it seems simple enough to do in PHP on the surface."
- "Yeah, but what about XYZ - last time we did that we got hosed by their host's PHP settings."
- "Sure, but we can get that information up-front."
- "Yeah, but there's a lot of fields here. I'd like to give Symphony a shot." (Symphony is a PHP framework)
- "We can't do that. Symphony requires PHP5, and PHP was chosen so they can work with regular shared hosting, and shared hosting providers don't generally offer PHP5."
- "They will by next year, PHP4 will no longer be supported after December."
- "They need to host it this year though. We could get them to specify PHP5 when looking for hosting. Wait-a-sec, if we're going to require them to obtain specialized hosting, why don't we just use Rails?"
- "Hells yeah, that would work."

And lo, the project became a Rails project instead of PHP.

So, what caused the conversation to go this way?

I've been programming PHP for years. Don't much like it. Why do I keep doing it? In the end, every time we look at it, the ONLY reason we ever do a project in PHP is because it's part of a web site and must be supported in a shared hosting environment. That's it. None of our developers enjoy working with PHP - it's poorly documented, quirky, and nearly impossible to debug.

Why is it so popular? It all comes down to PHP itself and the community that thrives on it. Most web projects are small projects, with little actual programming. PHP developers can get by with a little syntax and some basic programming constructs like conditionals, loops, and function calls. Hosting providers can simply pick the off-the-shelf control panel software on which to run their business, and it supports PHP. It's the lowest common denominator in the hosting market.

PHP supports few useful programming idioms. It doesn't support the simplest of object-oriented constructs, never mind the tremendously time saving constructs such as the mix-ins or continuations you get in Ruby. In fact, I'd estimate in PHP4 I get to use maybe 20% of my programming bag-of-tricks.

As a result, it's a "good enough" technology for most. It "gets the job done", and it's reasonably simple to work on (though if I see one more fool programming PHP live on their production web environment I'm gonna scream).

**So, what if you're not happy with "good enough"?**

That's where we're at. We're _not_ happy with "good enough", and "good enough" is certainly not what we want for our customers.

So, it turns out we may lose this project because it's too expensive, and too hard to host. It's too bad, because it would have been superb.
