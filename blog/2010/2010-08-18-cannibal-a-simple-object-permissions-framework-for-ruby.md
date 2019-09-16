---
title: "Cannibal: A simple Object permissions framework for Ruby"
date: "2010-08-18"
published: true
---

I'm proud to announce that we're releasing one of our newer frameworks into the open-source community - specifically under the [Simplified BSD License](http://en.wikipedia.org/wiki/BSD_licenses#2-clause_license_.28.22Simplified_BSD_License.22_or_.22FreeBSD_License.22.29).

Cannibal is a permissions framework for object-to-object declaration and querying of permissions or capabilities. It is distributed as a standard [gem library through rubygems.org](http://rubygems.org/gems/cannibal). You can also view the [source-code at github](http://github.com/ThreeWiseMen/cannibal).

So far, Cannibal has done reasonably well for us on various projects. It's syntax could use some improvement but we believe it's fairly expressive as it is - if you have suggestions for improvements, please write!

Basically you declare a class as either an Actor, or a Subject, or both. You do this by including the appropriate Cannibal mix-in:

class User < ActiveRecord::Base
    include Cannibal::Actor
end

class Thing < ActiveRecord::Base
    include Cannibal::Subject
end

Then you declare permissions for your Subjects. For example, if you want any User to be able to view any Thing object, but only want users with the "Administrator" role to be able to edit them, you might declare that like this:

class Thing < ActiveRecord::Base
    include Cannibal::Subject
    allow User, :view
    permission({
        :actor => User,
        :verb => :edit,
        :actor\_proc => Proc.new{ |user|
            user.role == 'Administrator'
        }
    }) 
end

Once declared permissions are easy to query, and read very well:

if @user.can? :edit, @thing
    ...
else
    ...
end

As you can see the permissions() method on Subject is still a bit ugly, and is the main reason for the < 1.0 release number. I'm definitely open to suggestions on improving its syntax.

Testing coverage is not bad, though there is some duplication between our rspec tests and our cucumber tests, and there's a ton of refactoring yet to be done, but it's working on a couple pet projects of mine and will be going into production for a customer project or two within the next couple weeks.

Enjoy :)
