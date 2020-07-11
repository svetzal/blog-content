---
title: "VMware ESXi At Long Last"
date: "2008-07-23"
published: true
---

Today we finally got our Dell VM server going again. We had lost 2 disks from our 4 disk RAID5 so we needed to reinstall.

So I decided to give VMware ESXi 3.5 a try. In fact I even found a how-to on installing it to a bootable USB stick.

So now our RAID volume is totally dedicated to VM storage and we spent the rest of the day getting our recovered VM images onto the box.

I am reasonably impressed with the VMware tools like the migration tool. Once we had things figured out it only took about 20 minutes per 20GB VM image to get them transferred over.

Figuring out the right procedure was a bit of an adventure though. You can't just copy the VM folder to the ESX storage as the virtual hardware is unrecognizeable. And if you have disk image files bigger than 2GB you might be in for a 'treat'.

It looks like I will be able to get by with under $1000 in license fees too.

The key reasons I am wiling to spend money on ESX instead of continuing to use the free VMware Server product??

\- proper disk snapshots, no crazy single snapshot limitation - no operating system to maintain - I can hard bind resources like CPUs to a VM - and lastly I can set up a quad processor vm system for vertical scalability testing
