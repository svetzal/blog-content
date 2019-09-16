---
title: "Securing Data on a USB Drive on Mac OS X"
date: "2009-06-06"
published: true
---

I was looking for a good way to encrypt data on a portable disk on my Mac, and was surprised at the range of misleading information out on the Internet. So, it inspired me to write this post in hopes that I can save people the pain and aggravation of figuring it out for themselves, or getting turned off and deciding that it isn't possible without buying extra software.

If you want to save private data on a USB drive, or actually any disk, it's actually pretty easy and doesn't require any extra software. The encryption is reasonably strong too (well, as strong as your password is, so pick a good one!).

So, let's get started.

First, open up Disk Utility. The easiest way is to hold down Command and hit the spacebar to pull up the Spotlight search and start typing "Disk Utility" until it shows up in the list under Applications, then press enter to launch it. The long way is to open a Finder window and go to your Applications Folder, open up the Utilities folder, then double-click on Disk Utility.

The way this works, is you're going to be creating a "Disk Image" that is encrypted. This is actually going to be a file on your USB drive. When you plug in your USB drive it'll open up but you won't see your private data. Instead, you'll see the Disk Image file. When you double-click that file, it will ask you for your password. If you enter the correct password, it will then "Mount" - which means your Mac will figure out it's a disk image and make it act like its own disk.

Any data you store on that new disk will be encrypted and stored on your USB drive, making it (here's my favourite term) "cryptographically infeasible" for someone else to open it without your password.

Once Disk Utility opens, click on the New Image icon at the top of the window. You'll get a dialog box with a few options - let's go through them.

So, because this is a file, when you clicked on "New Image" you get asked where to put that file. Make sure you pick your USB drive on the left and enter a filename, call it "Private Disk". Now the important part are the options underneath the file browser starting with Volume Name. This is the name that appears in the Finder for the disk, call it "Private Disk" too.

Under Volume Size, enter Custom, and then enter a smidge less than your USB drive can hold (or smaller if you want to also store un-encrypted data on it). So if you have a 4GB (4096MB) drive, use something like 4000 MB.

Under Volume Format, leave it at Mac OS Extended (Journaled).

Under Encryption, make sure you pick 256-bit AES encryption (more secure, but slower). _If you forget to change this, your data won't be protected!_

Under Partitions, select Single Partition - Apple Partition Map.

Under Image Format, pick sparse bundle disk image.

Then, click on the Create button. Your Mac will go ahead and create that disk image for you.

When the image is created, another dialog will pop up asking you to enter a password to protect the disk and to verify that password. Make sure you pick a good password, but one you can remember. If you forget your password, your data is LOST! If you don't pick a good password someone else might guess it.

The dialog box will tell you what it thinks of your password - if you click on the "Password Strength" link it will suggest some good passwords for you, but don't forget to memorize them. And fer cryin out loud, don't do something silly like write the password on your USB drive :)

And that's it! Quit the Disk Utility.

You'll find your disk image already mounted, look for Private Disk (or whatever you entered as the Volume Name) on the left-hand side of a finder window. To eject your drive, click on the eject button beside Private Disk, then on the eject button beside your USB drive. From now on, you'll have to remember to eject BOTH disks when you want to remove your key and take your private data with you.

When you plug your USB drive back in, it'll open and show you the private disk image. To get to your private files, double-click on that private disk image, wait for it to mount, and there you go!
