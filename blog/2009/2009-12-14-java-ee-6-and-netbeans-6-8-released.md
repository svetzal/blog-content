---
title: "Java EE 6 and Netbeans 6.8 Released"
date: "2009-12-14"
published: true
---

It's finally here, Java EE 6 represents another serious step forward in the core Java server technology stack.

It's kind of anti-climactic though - we've been using some of these technologies as standard on our Java EE apps for so long I forgot they weren't part of the core! Facelets is a big one there, building JSF pages in JSP was awful right from the start, and it's good to see Facelets in the core to bring powerful templating "out of the box".

Also, I've noted the examples in Netbeans are unfortunately just what we expect - way more boilerplate than we'd like to see. But one big difference this time is a lot of it is optional! Too bad the examples don't make it seem so. If you've avoided Java EE because of "too much boilerplate", and are looking at the examples in the Netbeans 6.8 templates, don't be disappointed. It's too bad they didn't take that opportunity to show what the platform can do in this respect.

So here are the important parts of Java EE 6 in our world (for the full list of new things, not just my favourites, [look here](http://java.sun.com/javaee/technologies/index.jsp)):

\- Facelets support - excellent templating

\- JPA2 - much more power in relational object mapping

\- WebBeans - more pervasive use of dependency injection for wiring

\- JAX-RS - simple annotated restful web services

\- EJBs in WAR projects allow for a simple but powerful small app layout

So it's time for me to start evaluating these things. Already have Glassfish 3 replaced my 2.2 testing installation, and Netbeans 6.8 set up as my IDE. It's also good timing for me as I'm doing a lot of prototyping these days for our internal products (Christmas is usually a very productive time of year for me :)).
