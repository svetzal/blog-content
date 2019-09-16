---
title: "End User Experience - Why, Microsoft, why?"
date: "2007-09-16"
published: true
---

I recently purchased a new laptop for one of my daughters, it came with Vista. This is the first Vista based computer in the house.

Let me give you a little background on me. I own a couple Macs, I'm an avid Linux user, and I've extensively used every prior version of Windows. We currently have 7 computers in the house (below average for us). I run a software development company. The end-user experience of any product is very important to me.

Why isn't it important to Microsoft?

I've just observed the absolute worst end-user experience I've ever seen, a convoluted sequence of events that would turn any new user off using computers (or at least Vista) forever.

So, my daughter wants to install her favourite game - Diablo II. She inserts the install CD, and is immediately blocked with a complex dialog concerning autorun, I wasn't quick enough to record the text therein, but it provided no good direction as to what to do. I had her select "always autoplay" because I believe this is helpful for novice users, and saves them having to figure out how to open Explorer and navigate to the CD to run the setup manually.

Prior to Vista, this would have been it. From here on in, the installer would have been the end-user's sole interaction during the install process, and it would have been relatively smooth.

Instead there was a rediculously complex set of interactions interrupting the process:

With each disc she inserts (Diablo II is 3 CD-ROMs), a dialog box prompts asking whether it should run SETUP.EXE on that disc. The options are simply "Cancel, I don't know where this program is from or what it's for." or "Allow, I trust this program. I know where it's from or I've used it before." are the two options available. She selects "Allow" because she wants the program to install.

Shortly after this she gets another dialog stating "This program might not have installed correctly" (the installer has not yet completed, but is still running) She's prompted to either "Reinstall using recommended settings", or "This program installed correctly". There's also a cancel button, which I direct her to use, but no regular person could possibly guess that from the dialog presented and the overarching operation they're trying to accomplish.

All in all, instead of watching the install dialog, swapping disks when prompted (there are 4 disc swaps), her experience is thus:

1. Insert the first CD, allow Autoplay
2. Click to install Diablo II
3. Diablo II prompts to insert a disc
4. Windows prompts to run SETUP on that disk, accept is chosen
5. Windows complains that SETUP has failed, cancel is chosen
6. Diablo II prompts to insert a disc
7. Windows prompts to run SETUP on that disk, accept is chosen
8. Windows complains that SETUP has failed, cancel is chosen
9. Diablo II prompts to insert a disc
10. Windows prompts to run SETUP on that disk, accept is chosen
11. Windows complains that SETUP has failed, cancel is chosen
12. Diablo II prompts to insert a disc
13. Windows prompts to run SETUP on that disk, accept is chosen
14. Windows complains that SETUP has failed, cancel is chosen
15. Seup finally completes

By the end of the process, my daughter was beginning to pick up on what was going on and asked why it complained each time that the setup had failed. Visibly frustrated, she shook her hands in exasperation. Now if I sit down and analyze this, it makes a certain kind of sense. Blizzard puts SETUP on each disc, because they want to be able to direct the end user towards the correct installation process regardless of what disc they insert. Autoplay triggers on this, and Accept allows it to run, but it terminates because the other install is in progress, which Microsoft errantly considers an installation failure.

Of course, she could probably have cancelled Windows from running SETUP on each disc insert to stop Windows believing setup failed each time, but Windows doesn't make it clear that SETUP was launched as a result of autorun and it seemed contrary to her desired action (install the game).

The best installation process I've seen is what is often done on the Mac, and it isn't an installer. Mac programs can be completely contained behind a single icon, dragged from drive to drive in their entirety and retaining integrity regardless of where it's placed. That's because the icon you see represents the folder in which the software and all its resources are installed. In fact, some users are amused by the common practice for Mac distributions to simply place the application's icon beside an alias to the computer's Applications folder - directing the user to simply drag the icon on top of the folder to "install" which in reality is just the normal file move/copy gesture.

Microsoft has created a terrible place for end-users to live, and with each release of Windows they make it worse. How much of this will the world take?
