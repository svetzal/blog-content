---
title: "Database Queries - Programmatic Criteria vs. EQL?"
date: "2007-11-16"
published: true
---

So, an associate of mine is really enjoying programmatic database query criteria, and now it's spilled over onto me :)

The use-case that wins us over is when your statements introduce conditional constraints. Think of the following in SQL:

\[sourcecode language="sql"\] SELECT \* FROM table;\[/sourcecode\] Not a lot of reason there to stray. In fact, with Hibernate persistence under Java EE, this is often shortened to the following EQL (EJB Query Language): \[sourcecode language="sql"\] FROM Entity\[/sourcecode\] There's really not much to optimize there. But consider when you want to query on a constraint that may or may not be present. Like this: \[sourcecode language="sql"\] SELECT \* FROM table WHERE column=:value\[/sourcecode\] But you may or may not have a value, so then you need 2 different queries; let's use PHP: \[sourcecode language="php"\] $query = "SELECT \* FROM table"; if (defined($value)) { $query .= " WHERE column='"; $query .= mysql\_real\_escape($value); $query .= "'"; }\[/sourcecode\] (I've ranted before on dynamically generated SQL, but let that pass for now) So our code begins to get complicated. What if we have many WHERE clauses? Then you need to do all kinds of string manipulation to ensure that you have appropriate AND and OR keywords, proper groupings in parentheses, you get the idea. Kind of a mess.So, enter Programmatic Criteria. Here's some Java code using a Hibernate session: \[sourcecode language="Java"\] Criteria crit = session.createCriteria(Entity.class); if (value != null) crit.add( Restrictions.eq("column", value));\[/sourcecode\] Much much simpler eh? A little foreign if you're used to SQL, but straightforward to any object-oriented developer. Here's something a little more complex: \[sourcecode language="Java"\] Criteria crit = session.createCriteria(Entity.class);

Criteria group1 = Restrictions.conjunction(); // AND if (value1 != null) group1.add( Restrictions.eq("column1", value1)); if (value2 != null) group1.add( Restrictions.ne("column2", value2)); if (value3 != null) group1.add( Restrictions.ge("column3", value3));

Criteria group2 = Restrictions.disjunction(); // OR if (value4 != null) group2.add( Restrictions.eq("column4", value4)); if (value5 != null) group2.add( Restrictions.eq("column5", value5));

crit.add(Restrictions.conjunction() .add(group1) .add(group2));\[/sourcecode\] So why is this useful? On a project we're on right now, we're concentrating business focused data-access logic into a single place to set up all of our criteria so that we can perform some automated testing. It's working out pretty nicely, and I have to admit - the code is darn clean compared to a boot-load of string manipulation.
