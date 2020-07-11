---
title: "Unit Testing: It's About Confidence"
date: "2007-09-07"
published: true
---

I was reading [this post](http://www.deaded.com/staticpages/index.php/whywritetestcode), which raises some interesting points, but it sidesteps what I believe is the absolutely **most important reason** to unit test.

As a developer, when I change code I have a mental model of what I'm affecting. The larger the project, the longer ago I worked on it, or any additional team members contributing code means that my mental model strays further and further from reality.

Unit tests are a hard-shot of reality.

They are a huge banging klaxon that my mental model is not quite aligned, and the code that I just wrote bent reality beyond acceptable tolerance.

Without this, my confidence in the code I've written begins to waver. I think it will work, because in my own mental model it does work. However I know the fallacies of my own mental models.

Watch someone who isn't confident in what they are doing.

They go slowly, more slowly than they have to. They interrupt their work constantly to double-check (often manually) that things are still working. This can take a 30 minute programming task and turn it into a 4 hour marathon.

This is why unit testing is the simplest and most important tool in any developer's arsenal.
