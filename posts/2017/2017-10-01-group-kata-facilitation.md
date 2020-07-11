---
title: "Group Kata Facilitation"
date: "2017-10-01"
published: true
---

This is my fall-back group format when facilitating kata.

> Timeframe: **60m total - 45-50m exercise, 10-15m retrospective** Group Size: **6-16 participants (3-8 pairs)** Room Setup: **one laptop per pair, optional projector or TV for kata description**

## Choosing a Kata

Choose your kata ahead of time, and come in prepared with it. A projector or TV with the kata description shown throughout the session can be a helpful reference. My favourite place for kata ideas is Dave Thomas' [CodeKata](http://codekata.com) site.

There are some helpful technologies out there too, if the team wants to explore a new programming language or test framework then [cyber-dojo](http://cyber-dojo.org) is a great zero-setup web based environment with which to start. _If you're doing this within an organization, I recommend supporting the [cyber-dojo Foundation](http://blog.cyber-dojo.org/2015/08/cyber-dojo-foundation.html) who assembled and maintain the technologies._

Any kata will do, though when starting a practice regime with a team [I like to focus on simpler code katas like Fizzbuzz](https://codingculture.io/2017/05/13/worthiness-fizzbuzz-kata/). I find it useful to start from a baseline, uncover some assumptions, and help the pairs focus on their approach rather than solving a puzzle.

## Choosing a Theme

You may optionally choose a theme to explore with the kata. You could do this with a constraint, or you might launch a language exploration (having Javascript developers explore ES6 constructs like Promises), really this can be any behaviour you're trying to encourage within your actual projects that you feel could use some practice.

Write the theme up on a whiteboard or easel for everyone to see during the session.

Some themes I've used:

- Talk to each other (new to pairing, sometimes being reminded of the basics helps)
- Test first (for teams struggling to make this a regular practice)
- Functional core, imperative shell (HT to Gary Bernhardt and his [Boundaries](https://www.destroyallsoftware.com/talks/boundaries) talk)
- Javascript: Promises are your friend, Async / await, Generators (wherever they're struggling)
- (lots more I could put here...)

## Exploring The Edges with Constraints

Simpler exercises like Fizzbuzz often get solved quickly, and adding constraints to either the whole room (if everyone's about on the same level) or to a pair (if they're significantly ahead) can help slow them down and widen their skills.

### Language / Idiom Exploration

#### No Ifs (Level 1)

Removing "if" statements can be a first step towards pushing towards polymorphic or dynamic solutions, and will often settle folks into using clever ternary operators.

#### No Conditionals (Level 2)

This will push folks more cleanly into polymorphic or dynamic solutions, if people balk at this, have them do No Ifs first.

#### No Primitives

This will encourage folks to gather state together in structures, look for and encourage cohesive structures as you wander the room. They may even begin to add behaviour to those structures, and that's a great place for a conversation around functional versus imperative code.

#### No Methods / Functions > 3 Lines

This is a great way to practice refactoring as you go, and to practice naming things as you extract.

#### No Mutations / No Assignments

A significant class of bugs arise from unexpected mutations in data structures and classes, so this is a great way to explore how to build using pure functional idioms.

#### No Loops

Recursion can be a handy way of tackling some problems, but loops tend to be the go-to structure for many developers. Help them think beyond the loop.

### Kinesthetics / Ergonomics / Environmental

#### No IDE

Folks can become too dependent on auto-completion technologies, so taking them out of their IDE pushes them to use other ways of looking up references. Sometimes a quick peek at that long forgotten documentation can be a chance for discovery.

#### No Mouse

Sometimes we get a little too comfortable with the mouse, and forget about how much it slows us down when we have a job to do. Our text editors and IDEs are full of handy keyboard shortcuts for changing and navigating our code.

### Pair Dynamics

#### Ping Pong

Often the default thing you want to do once you start encouraging pairing. Before pairs figure out their best dynamics, this starting point can get them thinking about the TDD cycle.

One of the pair writes a test, and the other makes it pass and refactors it to be clean. Then the other writes the next test and the first makes it pass and makes it clean. The keyboard is shifted regularly between the pair, like a ping-pong ball, with each cycle.

#### Evil Pair

This is very much like Ping Pong, however when the developer makes the test pass they do so in a way that is counter to the solution they're seeking. It's fun to see a passing test suite in a solution that does nothing at all like it's supposed to.

Warning: This will stress folks' creativity, and can lead to much laughter!

#### Golf

While doing Ping Pong, count the number of keystrokes typed to pass a test. Who got the lowest score?

#### Kata Chain

[A group kata exercise, described here](https://codingculture.io/2017/10/01/my-fishbowl-group-kata-exercise/).

## During The Kata

Wander the room with the developers, and swoop in and out of what they're doing.

Ergonomics checks:

- are they talking to each other?
- are they passing the keyboard back and forth?
- are they taking care to ensure both can see the screen as they work?

Code checks:

- if you established constraints for the kata, how are they coping?
- if you established a theme for the kata, are they following it / do they understand it?
- how's their TDD cycle length? (you want short 3-5 minute cycles)
- if they're progressing to quickly to the solution, introduce a constraint
