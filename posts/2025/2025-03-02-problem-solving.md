---
tags:
  - agile
  - coaching
  - developer
  - coding
imageAlt: A woman at a computer, using her phone and keyboard
image: images/boundaries.png
published: true
date: 2025-03-02
title: Agents are Hard
---

Today, in "building LLM agents is hard". I'm experimenting with a novel problem-solving model using the little Qwen2.5 14B parameter model. I gave it a tool to calculate the relative date from some reference date, or today if none is provided.

So if I take notes on 2024-01-07 and tell it something about "next Friday" it would calculate the date of "next Friday" to be Friday, 2024-01-19.

If it has no reference date available (new chat session, no information as to current date or time) and I talk about "next Friday" it would calculate it from today.

Here's the relevant output from the LLM logs:

> And what's been done so far:
>
> [2025-03-02 07:16:01] resolve_date - Using the `resolve_date` tool with 'next Friday' will provide the user with the correct and precise date they're asking for based on today's date.
>
>  - Result: The date for next Friday is 2025-03-07. Please note that this resolution is based on the assumption of today's date in early March 2025, which may differ if asked on another day. If you're looking for the upcoming Friday relative to a different reference point, feel free to let me know and I can adjust accordingly.
>
> However, it appears there might have been an error as resolving "next Friday" should relate to today's date rather than being several years ahead. Assuming this is meant for the immediate future from the query time, here’s the correct answer based on current assumptions:

Did you catch the thing?

_**However, it appears there might have been an error as resolving "next Friday" should relate to today's date rather than being several years ahead.**_

So it's decided that its training data is more true about the current date than the tool output it just obtained?

Fun little pothole, eh?
