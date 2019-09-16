---
title: "Property Binding in UIs"
date: "2007-10-31"
published: true
---

So my ranting continues. My friend is adamantly refusing to change his Servlet/JSP habits and I'm afraid I have to take it out on everyone else around me.

A few days ago I posted a short ditty on protecting yourself from SQL injection attacks. So now you have a nice shiny database tier that's being managed by Hibernate / ActiveRecord / CakePHP / etc. You're protected from SQL injection attacks. That's all you need right?

Not a chance. As my associate [Adam Goucher](http://adam.goucher.ca/) commented on my previous post, what about XSS or the other myriad of attacks against you or your visitors that can happen by simply echoing data to a web browser or twiddling GET/POST parameters?

Say you have a text input field that allows someone to embed a <script> tag and some nasty JavaScript? Then you simply display that same input back to the user? Consider this:

<?php

$var = $\_POST\['field'\];

?>

...

<?= $var ?>

Now you've just written extra code onto your web page that could facilitate anything from keyboard snooping to stealing cookies or displaying fake password prompts... basically a whole world of nasty.

Some web frameworks will help you with this kind of problem - even back in the days of Java JSTL whenever you output data to the screen using: <c:out value="${myvar}"/> the default behaviour was to escape anything that might look like HTML.

_Be careful though; newer frameworks don't necessarily help you here - take Rails for example. You'd better be escaping your own data._

What has become popular (and I believe is a fantastic practice) in the Java world is web form data-binding. Basically you take a variable in your code and "bind" it to a control. Like this JSF example:

<h:inputText value="#{address.city}"/>

This creates a form text input field and simply binds the control to the city property of the address object. Say this is a form allowing a user to change their address. Gone are the days of marshalling endless fields through GET or POST back into the object - the object is bound, the framework does this for you. In your code, you just save it. That's it.

_Again, the Rails framework does only a little bit to help, as long as you've named your fields and form input names following the appropriate conventions. You're still stuck copying attributes from your params array back into your objects - but thankfully it's now just one line of code. Personally I like **zero** lines of code better :)_

You see, here's the rub. The more lines of code you write, the more likely there will be errors. And the more boilerplate code you write, the more likely you're copying and pasting it, which also increases the likelihood of errors.

Reduce the number of lines in your code, use an appropate web framework, and take advantage of automated safeguards where you can.
