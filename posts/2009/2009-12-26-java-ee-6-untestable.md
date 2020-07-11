---
title: "Java EE 6, Untestable?"
date: "2009-12-26"
published: true
---

Trying to work something out and it just doesn't look possible right now.

Since Java EE 6 was officially released earlier this month, I've been pretty jazzed about it. It represents significant leaps forward in simplicity and developer productivity.

I was so encouraged, I started a couple projects to start experimenting with what I could do with the environment.

Unfortunately when it came time to integrate automated testing, I hit a large brick wall.

It's all well and good to have these nice testable POJOs, but many of the bugs in a system are due to misinterpreting or misunderstanding of the underlying technologies by developers just getting started or not paying attention. If you use JPA2's persist() on an object for example, can you be sure your configuration will conclusively save the linked objects as well? This is the kind of thing we build integration tests for.

I use Maven 2 for all of my Java / Groovy project builds, and it has also been enjoying much broader support in the industry. As a result, developers are now more cognizant than ever before of their underlying dependencies. This is a Good Thing™.

The typical Maven 2 dependency on the Java EE 6 web profile APIs would look like this:

```xml
<dependency>
  <groupId>javax</groupId>
  <artifactId>javaee-web-api</artifactId>
  <version>6.0</version>
  <scope>provided</scope>
</dependency>
```

The jar referred to here contains all of the annotations and APIs you should need, from JPA 2 to Servlet 3. Unfortunately I can't find any implementations to play nicely with it.

So with the API included above, you'd think it would make sense to say find a JPA implementation like EclipseLink (the default JPA 2 implementation in Glassfish 3) and include it as an embedded implementation for your unit testing. However if you include a block like this:

```xml
<dependency>
 <groupId>org.eclipse.persistence</groupId>
 <artifactId>eclipselink</artifactId>
 <version>2.0.0</version>
 <scope>test</scope>
</dependency>
```

You end up with your tests failing with the following exception:

java.lang.ClassFormatError: Absent Code attribute in method that is not
 native or abstract in class file javax/persistence/Persistence

It appears that in some way the EclipseLink implementation is not completely filling in the blanks in the API.

I've dug through the Glassfish project (it too is a Maven 2 build) and don't have enough familiarity to draw out a nice clean implementation jar to include in my own project's test scope... despite several attempts.

I haven't given up, but unfortunately this has blown a couple weeks of productivity and I'm going to have to abandon my current projects in order to have something to show for all this time I've been spending. Sigh.

Comments extremely welcome on this one, I'd love to get past this impasse.
