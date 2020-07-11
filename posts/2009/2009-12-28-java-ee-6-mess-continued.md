---
title: "Java EE 6 Mess, Continued"
date: "2009-12-28"
published: true
---

OK, found another brick wall :)

So if you recall, I have a Maven 2 build. I now have discreet API jars isolated for JPA 2, Servlet 3, and EJB 3.1. This allows me to build with a single dependency tree for production and still provide a suitable environment for automated testing by providing EclipseLink as a JPA2 implementation under my "test" scope.

My next challenge came when I wanted to use [CDI (Contexts and Dependency Injection)](http://java.sun.com/javaee/6/docs/tutorial/doc/gjbnr.html) to start wiring up components for use in my Facelets templates. If you recall, CDI allows you to do things like name your components and place them into specific scopes (session, request, conversation, application) so that they are lazily instantiated on demand when your web templates need their services. It also provides automatic dependency injection so when your components require other components to work, they can have themselves automatically created and injected by the container.

You'd think that because CDI largely came from [Weld](http://seamframework.org/Download) that the API jar would be reasonably simple to isolate. Strangely however some of the annotations I need (@Named, actually the whole javax.inject.\* namespace) are completely missing from the Weld 1.0.0 and 1.0.0.SP1 distributions, and they're buried in Glassfish in the weld-osgi-bundle.jar in between all the implementation stuff.

The [JSR](http://jcp.org/aboutJava/communityprocess/final/jsr299/index.html) for CDI points to the Weld 1.0.0 distribution so I'm SNAFU'd there looking for javax.inject.\*, and I've been unable to find another useable jar out there in the wild that contains this part of the API.

Of course, it's fully present in the javax / javaee-web-api / 6.0 dependency which [completely FAILS](http://svetzal.wordpress.com/2009/12/26/java-ee-6-untestable/) when used with EclipseLink JPA 2 implementation, which is why I moved away from it to begin with.

How can you expect anyone to get anything done in an environment like this?
