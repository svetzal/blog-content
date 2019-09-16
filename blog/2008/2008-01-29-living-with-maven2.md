---
title: "Living with Maven2"
date: "2008-01-29"
published: true
---

I often see a lot of complaining about the [Apache Maven](http://maven.apache.org/) build tool. In fact, sometimes I do a lot of complaining about it myself.

The fact is, however, that ever since my friend [Mike Bowler](http://www.sphericalimprovement.com/blogs/mbowler/) introduced me to it I've been hooked.

**The Good**

Maven provides a well defined [build lifecycle](http://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html) with logical stages that fire in a known sequence. You can noodle with it a little by triggering plugins at different points in the execution, but there's only a couple places to look to see where that's done (actually only 1 place - your POM - if you're not using build profiles).

I can't say how many times I've tried to untie the tangled shoelace of an Ant build. What goals trigger what goals? What is the thread of assembly? With Maven, no matter how large the project, you know the story, and with Ant you're never sure - and the larger the project the less sure you are.

Now in Ant's defense, it is not designed to help you with this complexity. It is solely up to the strength of the developers maintaining your build. Making an Ant build easy to understand just takes good structure and comments. Good luck, you're on your own.

You could say (and I have before) that Maven reduces things to a common denominator. You can't get "fancy" with super-tricky sophisticated builds that only you can parse. Your Maven builds do feel a little "dumbed down". And in my world, this is worth its weight in gold. I can't afford to have a high hit-by-a-bus factor on any of our projects - or a rogue super-smart developer injecting little bits of brittle magic into the most critical piece of source-code in the entire project (you do consider your build file the most important piece of code, right?).

**The Bad**

Sometimes it's really compelling to add in that experimental Codehaus repository to get that nifty new plugin. Don't do it.

Adding plugin repositories is the quickest way you have to destabilize your build.

While the core Maven repositories are fairly stable (I don't know anyone personally ganked by core plugin updates), the maven experimental and third-party repositories must be very carefully considered.

One of the first things you will want when using Maven is a **LOCAL** repository for artifacts and plugins. Move any required plugins into your local repository after careful consideration, ensure your local repository is the only external one referenced in your POM, and you simply can't get bitten by any external factors.

Setting up a local repository is trivial. You can do it under any website, on any of your internal web servers or on your shared hosting account. It requires no software. All it is is a file / directory structure - and it is easy to prime by simply copying your own ~/.m2/repository folder onto it and then telling Maven how to get to it in your POM.

I chuckle at people's comments about Maven "downloading the Internet" to populate a developer's local workstation repository. Some of the Maven mirrors haven't been the fastest (and I've been frustrated in the past by hanging downloads), but your local repository fixes all this. If your system is spending more than a few minutes downloading artifacts then you seriously need to look at your third-party dependencies and see what you might want to trim out. If you haven't been careful with your transitive dependencies, you may find you're downloading 4 different versions of Xerces or some such silliness.

In fact, I find it's good practice to **occasionally erase** your local workstation repository and do a full build from scratch. This will tell you if you've accidentally crept in any additional artifacts you haven't mirrored onto your local repository. It'll also purge any experimental plugins you might have played with in the past.

**The Ugly**

Yeah, documentation has never been Maven's strong point. Get the [Better Builds with Maven](http://www.devzuz.com/web/guest/products/resources#BBWM) book (it's free). Seriously, get it and give it a quick read. Then go back to the Maven website and things will make more sense for you.

**The Tips and Tricks**

These are some tips I can provide when working with Maven:

- Netbeans with the maven2 plugin understands Maven2 projects as first-class projects. Your parent POM projects open as a POM project and allow you to easily open modules (sub-projects), which is a nice approach to resolving the hierarchial project problem.
    - Changes to your POM are also reflected IMMEDIATELY within Netbeans, no more shelling out to re-generate out-of-sync IDE project files
    - And fer cryin out loud, DON'T check in Eclipse or Netbeans project files into your source-code repository for a Maven project
- Accept and use the default directory structure for your source code
- Use a local repository for artifacts and plugins
- Don't put version numbers for dependencies in your module POMs, collect these into your parent POM in a <dependencyManagement/> block
- Use the Netbeans graph plugin or [Maven dependency tree](http://maven.apache.org/plugins/maven-dependency-plugin/examples/resolving-conflicts-using-the-dependency-tree.html) plugin to find out what your unexpected transitive dependencies are (if you haven't looked, you've probably got'em)
- Use <exclusions/> within your <dependency/> blocks to keep unwanted transitive dependencies from sneaking in
- Make sure you understand what dependencies you're using that are provided at run-time (say inside your server container), and mark them as such - huge candidates are things like servlet-apis, j2ee-apis, etc.

These simple tips will help keep your Maven builds lean and clean and dependable, and let you drop in any developer familiar with Maven to have them immediately productive.
