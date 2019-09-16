---
title: "Using Java EE 6, Without Java"
date: "2009-12-17"
published: true
---

So this month, Java EE 6 was released. So many new capabilities are now part of the baseline stack, it's very cool.

After tweeting about how much boilerplate configuration and coding can be eliminated using EE 6, a colleague pointed out that the Java language itself indeed contains much boilerplate code. I realized I'd failed at helping people understand that the Java programming language is today only one of many programming languages you might use on the JVM, and how this relates to classic Java web application development.

I realize that Grails, and JRuby on Rails, and Lift for Scala are all interesting web frameworks. That's not the point of this post - I'm here to show you how easy it is to set up a Maven 2 project using Groovy for code and Facelets for presentation all glued together with Java EE 6 and deployed on Glassfish 3. Oh, and there's a fun bonus for you at the end :)

You can access the full source from [my Github project](http://github.com/svetzal/GroovyEE6/). You will need [Java SE version 6](http://java.sun.com) and [Maven 2](http://maven.apache.org) set up to compile it. You will need [Glassfish 3](https://glassfish.dev.java.net/downloads/v3-final.html) installed to deploy it.

Maven needs 2 blocks in the POM (pom.xml) to be able to build your Groovy code - one to declare the gmaven-runtime dependency and one to have Maven build the Groovy code from src/main/groovy.

The service bean looks like this:

`

@ManagedBean(name="groovyBean")
@RequestScoped
class GroovyService {
    String simpleProperty = "Nope, this is not a method!"

    def getMessage() {
        "Hello, Groovy World!"
    }
}

`

Notice that in Groovy the Java EE 6 annotations look exactly the same as in Java. The class doesn't illustrate any of the power of the Groovy language itself but as long as you use "bean patterns" - ie. get / set method names - you'll have no problem interfacing with your service from JSF.

Referencing the service method in JSF is as simple as:

<p>It says - #{groovyBean.message}</p>

And that special bonus? Using "ab" to measure pure HTTP transactional performance, under Glassfish 3 my simple page does over a THOUSAND requests per second. Yeah, I know, benchmarks suck. Stay tuned and we'll slow this down a whole lot by tackling some more interesting things like database connectivity and transactional services.
