---
title: "Lies, Damned Lies, and Code Comments"
date: "2015-02-03"
published: true
---

Your project is lying to you.

That comment that someone wrote way back over that block of code? Yeah, it was relevant a year ago. Today, it's definitely a lie. Probably a damned lie. Maybe worse.

It's definitely worse if that comment regurgitates what the code probably used to do, and now looking at the new code it's obvious it's lying to you. It's way worse if you actually took that comment at face value, allowing it to deceive you for a time.

Or maybe you don't understand the code as well as you think. Let's take a few minutes and pick it apart. Minutes you didn't account for, but, how bad could it be?

And, look, there, it's hinting at maybe why it was written that way last year, but the business no longer depends on that, so not only is it lying to you about what the code is doing, but it's also lying to you about why it's doing it.

Stop it.

1. If you see a comment that lies, fix it or delete it. Immediately. If you leave that there, it _will_ do harm, and that harm will be _your_ responsibility.
    
2. If you've found the [Chaos in the Matryoshka](https://codingculture.io/wp-content/uploads/2015/02/the-chaos-in-the-matryoshka), use code comments to explain _why_ the code looks as twisted as it does. Clearly. Concisely. Don't use expletives.
    
3. If you feel you need to write a comment to explain _what_ the code is doing, refactor the code so that it is clear. That's bad code. Fix it. Immediately.
    

"But but but... I didn't add that time to my estimate!"

Then you estimated poorly, didn't you. Do better next time.

The code you are looking at is your responsibility. Not your managers. Not your CEOs. Yours. You are the professional on the job. Own it.
