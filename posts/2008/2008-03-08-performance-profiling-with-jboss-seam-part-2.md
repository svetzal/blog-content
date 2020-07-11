---
title: "Performance Profiling with JBoss Seam - Part 2"
date: "2008-03-08"
published: true
---

On my last post, I began dissecting what might be causing [JBoss Seam](http://labs.jboss.com/jbossseam/) to be "slow" on one of our projects. In this post, I'm going to show the results of some testing on another Seam based project which hasn't shown slow performance.

At TWM we have a product called [Communicator](http://threewisemen.ca/article.php?id=AK6-3C) that does bulk correspondence for print or email. It archives this correspondence over a WebService interface to a central server, which has a Seam based UI to browse and examine the correspondence sent.

This application does not have any Ajax style interaction, and does not use anything outside the core JSF tag library (<h:\*/> and <f:\*/> tags). It does not use RichFaces like the previous project I examined.

This application is not conversational, as the end-user interactions are very simplistic. As a result, the work is done by a couple of Session scoped POJO service beans. Persistence is provided by JPA using Hibernate, and the application deploys inside JBoss 4.2.2.GA. I also have EHCache configured as a 2nd level cache provider for Hibernate.

There are 3 main pages in the application:

1\. main

This holds a search dialog and search results.

2\. recipient

This holds a list of correspondence sent to a selected recipient.

3\. communication

This displays an individual piece of correspondence sent (HTML shown inline, other datatypes downloadable).

After figuring out the magic to allow [Selenium](http://selenium.openqa.org/) to run integration tests on the site, I decided to use my main integration test case to stress the application so I could gather timing information. (By the way, the "magic" was just assigning some ID elements to forms and form elements, not all that magical as it turns out! Selenium IDE needs some stable identifiers in the HTML to grab ahold of when recording tests.)

So the average response times of each page? (averaged over 25 requests, as reported by my servlet filter)

main - 62ms, or avg 16 tps recipient - 66ms, or avg 15 tps communication -  67ms, or avg 15 tps

As you can see, on this simple application I am seeing respectable response times. You can't compare these times to my Part 1 post, as you're not comparing apples to apples - I simply can't use Apache ab to benchmark this, and as such this does not reflect any improvements through concurrency or any degradations due to HTTP overhead.

I've decided to use this application for further testing (because it's a TWM application, I'm free to experiment with it).

Further posts of mine will concentrate on using a similar testing style in order to gather results so that I can make some direct comparisons. Specifically using Selenium to drive representative interactions through the web UI, and using results from the servlet filter to determine response times.
