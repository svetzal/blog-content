---
title: "Sanitizing your input considered harmful."
date: "2007-10-24"
published: true
---

Yeah, you heard me. I love those sensationalist headlines.

I've been frustrated lately trying to bring some associates along in their web development practices. For those getting started now in web development, please don't try and climb the long road of discovery to good web development practices along the path that I and so many others have taken.

Take the new road.

You see, the technique of sanitizing your input _assumes that it must be sanitized_. It assumes that you are constructing code (be it a SQL statement or other) from input provided by an end user, who may or may not be trying to hack your application. In this post, I'm focusing on database interfacing.

Modern application frameworks have taken this burden away from you, so please use them.

Hopefully, you're using a web framework that does this for you internally. Some programming environments (ie. PHP) are stuck in the land of eternal santization because they don't support the more sophisticated database binding technologies. If you're using a framework in an environment like PHP, you must take care - do you have projects out there using old exploitable versions of frameworks?

Let's dig further. Modern database interfaces typically have the concept of bound variables. Bound variables are 100% safe, because the executed code is STATICALLY DEFINED in your app, and the variables are passed in separately.

So you can issue statements like this: "select \* from users where id=:id", where ":id" is a place-holder to be defined separately.

I'll use discreet PHP for the first example. Consider the following three pieces of code:

// BAD!
$v = $REQUEST\['myparam'\];
$explode\_me = mysql\_query("select \* from users where id='".$v."'");

// Dangerous
$v = $REQUEST\['myparam'\];
$v = my\_magic\_sanitizer($v); // hope you've thought of everything!
$please\_dont\_explode = mysql\_query("select \* from users where id='".$v."'");

// To my knowledge, the best you can do in PHP
$v = $REQUEST\['myparam'\];
$v = mysql\_real\_escape\_string($v);
$probably\_safe = mysql\_query("select \* from users where id='".$v."'");

Notice that the best you can accomplish in PHP is a dynamic SQL statement using the MySQL sanitizer, mysql\_real\_escape\_string().

Here's the absolute best you can do (I'll use Java JPA as an example, but many environments provide this ability)

// Java
List users = pm.createQuery("SELECT u FROM Users u WHERE name=:name")
                 .setParameter("name", request.getParameter("name"))
                 .getResultList();

Notice that we can simply pass the request parameter directly into the database call. It's 100% guaranteed safe. Here's a similar example in Ruby with SQLLite:

// Ruby
db.execute("SELECT \* FROM users WHERE name=:name", "name" => param\['name'\])

**There's another side-benefit of this technique**, and that's a feature few people pay attention to until they realize their application doesn't scale well. Statement Caching is an automated caching technique used by your database to save it having to parse through the text of your queries every single time you execute them.

If you always use dynamic statements in your application, you rarely benefit from Statement Caching.

However if you use other environments and the techniques I've shown you above, you can gain significant performance (depending on the rest of your application) through your databases Statement Cache. Prepared statements are closely related to statement caching, except you are in control over what is cached.

If you are using a framework such as CakePHP or Ruby On Rails the task of looking up items based on their id or primary key is taken care of by the framework, so you don't typically build statements anyways.

Happy coding...
