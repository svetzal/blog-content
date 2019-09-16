---
title: "Wishing for the days of XML Deploy-time configuration??!!"
date: "2008-03-09"
published: true
---

Wow, so here's a short one for you.

I'm tuning an application to utilize the Hibernate 2nd level cache. The application uses Hibernate Annotations extensively to mark up the model and map it to PostgreSQL.

And I've just caught myself sitting back and wishing for old-school Hibernate XML mapping files so I wouldn't have to recompile the project to explore each scenario.

I'm not changing a bit of application logic, this is purely an installation environment specific tuning exercise. And yet I have to recompile code and copy it up to the server instead of just tuning an XML file or two and restarting.

I know a lot of people (including myself!) have become enamored with Annotations, but you really have to sit back and understand what problems are best solved with them, and maybe what problems aren't.
