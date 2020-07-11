---
title: "Performance Profiling with JBoss Seam - Part 1"
date: "2008-03-02"
published: true
---

So, I decided I had had enough of looking at 400-600ms server prep times for Seam pages on a project we're working on. It just didn't seam right - could the Seam framework really have this much of an impact on performance?

I did some digging, and I came up with some interesting baseline stats. These were done by actually just adding a new webpage to an existing app (kind of, let's see how fast we can make this app go approach).

I tried initial testing between a simple page and a page that used a `<ui:composition>` and found no difference in performance, so all the tests below use a simple XHTML page that is a composition with a backing template and a single region insertion. The page uses a single `<h:outputText>` component that displays a value from a message bundle for the HTML title.

I tested out the following scenarios, here there are with my results:

1\. Basic Page

- 32.898ms mean request time across 1000 requests with 4-threads
- ~30.4 tps

2\. Basic Page with 12 `<h:outputText>` components on it that call a simple method on a stateless POJO Seam component

- 33.048ms mean request time across 1000 requests with 4 threads
- ~30.3 tps

3\. Basic Page with 12 `<h:outputText>` components on it that call a simple method on a stateful (Conversation scope) POJO Seam component

- 44.142ms mean request time across 1000 requests with 4 threads
- ~22.7 tps

4\. Basic Page with 12 `<h:outputText>` components on it that call a simple method on a Stateful EJB (Conversation scope) component

- 51.981ms mean request time across 1000 requests with 4 threads
- ~19.2 tps

5\. Same as # 4, but I added injection of the Seam logging handle, the Seam Identity component and a Seam managed Hibernate Session handle

- 78.249ms mean request time across 1000 requests with 4 threads
- ~12.8tps

As you can see, the base processing time introduced by the Seam framework is negligible. On very high capacity sites that do not require EJBs you might consider using POJO components that will gain you about 10% performance over the EJB infrastructure.

As you can see by test #5 above, when you start injecting components beware of overhead. My testing was very simplistic, just using Apache "ab", which means every single request included the overhead of creating the session and conversation scopes - and in the case of # 5, also includes setup of the Log, Identity, and Hibernate Session handles.

As a result, test # 5 above is a little unfair, because most requests are going to be repeat requests from the same visitors, which will not include this overhead.

I'm fairly pleased with Seam, and this testing allays my fears about it sucking too much performance from an application from a framework perspective. Now to quantify some of the effects of the techniques we're using on these other projects.

It's not at all surprising to note that your approach to a Seam web application design can have considerable impact on the performance of your application. Techniques that work well in other environments (ie. PHP, Rails, and other highly horizontally scalable "shared-nothing" environments) do not work well in Seam.

This should not be surprising, as the whole value of Seam is in the contextual component model, where you have shared resources that allow you to do things like save yourself round trips to the database and should theoretically allow you to scale a single instance of an application higher than "shared-nothing" environments.

Stay tuned for part 2, where I will examine in more detail ajax interaction timing and general Seam application design.
