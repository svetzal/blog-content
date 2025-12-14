---
mode: agent
---
Review all of my LinkedIn shares from the year ${input:year} by reading linked-in/Shares.csv which contains one share per row. For each share, extract the complete text and capture any external links I shared.

Then, group related shares into logical themes that capture recurring ideas or tensions. For each theme, identify the core insight and propose one corresponding blog-post idea. Present the results as a **Markdown table** with three columns — **Proposed blog post (working title)**, **Source material & URLs**, and **Notes** — listing multiple relevant LinkedIn share URLs (and any cited external links) with short descriptive phrases. In the Notes column, explain how the shares connect and what unifies them into a coherent idea.

After the table, include a **“Key Themes and Insights”** section summarizing major ideas from across all shares, written in a reflective and interpretive tone with bold sub-headings and short explanatory paragraphs. Group posts conceptually rather than chronologically, focus on extracting insights rather than summarizing, ensure each proposed blog idea is distinct, and maintain clean Markdown formatting ready for reuse in documentation or publication planning.

Write this to linked-in/Post Ideas ${input:year}.md