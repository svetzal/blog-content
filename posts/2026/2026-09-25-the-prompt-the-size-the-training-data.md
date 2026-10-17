---
title: "The prompt, the size, the training data"
date: 2026-09-25
published: false
description: "Post four of five: three things a person can change without touching the loop. Two starting words steer the output and change nothing in the model; a model a hundred times bigger attempts more without getting better at what it already did; and the training data, including the order it is in, decides what the model favours."
tags:
  - ai
  - coco
  - "6809"
  - learning
---

[Last post](https://stacey.vetzal.ca/2026/2026-10-17-twenty-epochs-then-the-assembly/) covered:

- Twenty passes through the 58 examples. Repeating a token goes first, the shape of a name comes second, and copying the training data arrives last. The loss falls the whole way and cannot tell you any of that.
- What the run costs. 302,760 multiplies, and a trainer bigger than the model it trains.
- The 6809 instructions for one nudge. Two unsigned multiplies and a subtraction make a signed one; four shift pairs are the learning rate; the bit that falls off the right is quantization.

The loop is the same in every post so far. This post holds it fixed and changes one thing at a time: the words it starts from, the number of parameters, and the training data. Each change is a decision a person made, and each one shows up in what comes out.

## The prompt

I used advertising slogans for the prompt demonstration so the starting words and their continuations would be recognizable. The second model is the same code, the same loop and the same machine, retrained on eight lines of 1980s computer advertising:

```text
THE WONDER COMPUTER OF THE 1980S
GET YOUR START IN COLOR COMPUTING
I ADORE MY 64
ARE YOU KEEPING UP WITH COMMODORE
THE COMPUTER FOR THE REST OF US
POWER WITHOUT THE PRICE
THE BIGGEST NAME IN LITTLE COMPUTERS
WHY BUY JUST A VIDEO GAME
```

Those eight lines are everything this model trained on. They make 38 tokens, 53 examples and 380 parameters, and I trained it for 80 epochs. Only four words carry over from the first model, 64, COLOR, COMMODORE and COMPUTER, and even those got new numbers. COMMODORE was 13; here it is 9, because that is where it lands alphabetically in this list. The weights were trained from scratch.

Eighty epochs on eight lines is a lot of training, and you already know what that does. This model recites. Post one called that overfitting, and for a model whose job was inventing names it was the failure. This model's job is finishing famous slogans, so reciting is the assignment. Whether overfitting is a problem is a decision about the task.

Now hold the model still. All 380 numbers, [checksum `6f9a6c88742221bb` before and after](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-005-prompted-marketing-language.md#L88-L107). This run takes the highest-scoring token every time, so the same start always gives the same answer. The one thing that changes is the first two tokens in the window before it starts.

| I put in the window | It produced |
| --- | --- |
| nothing | WHY BUY JUST A VIDEO GAME |
| I ADORE | MY 64 |
| ARE YOU | KEEPING UP IN LITTLE COMPUTERS |
| WHY BUY | JUST A VIDEO GAME |
| POWER WITHOUT | THE PRICE |
| GET YOUR | START IN COLOR COMPUTING |
| THE COMPUTER | FOR THE REST OF US |

Here is the machine doing it, recorded from the emulator at the real clock rate after the training had parked. One keypress opens the list; each Enter completes the selected prompt and moves to the next.

<video controls preload="metadata" playsinline style="width: 100%; max-width: 640px; display: block; margin: 0 auto; image-rendering: pixelated;" src="/2026/images/coco-llm-4-prompts.mp4">
The emulator completing the six prompts, one Enter each.
</video>

Five of the six are training lines, word for word, which is the overfit doing its job. ARE YOU is the one that is not. It starts inside Commodore's line and ends inside Radio Shack's, KEEPING UP IN LITTLE COMPUTERS, a slogan nobody ran. ARE YOU does occur in the training data, but greedy prediction does not reproduce its full continuation. With only two tokens of context, the output can switch between patterns from different slogans.

In this demonstration, the prompt supplies the first two context tokens. It changes the input to prediction while the 380 parameters stay fixed. When you type into a chat window, paste in a document, or a product adds a system prompt or a memory feature on your behalf, all of it goes into the same place: the context window, in front of whatever the model produces next. Generating these completions does not update the weights. A product may separately save chat history or use it in later training; neither happens in this demo.

You can pick the prompts yourself. `make present EXP=5` trains the model and then puts the six on screen under the title SAME MODEL - CHANGE THE PROMPT. That is [EXP-005, the prompted marketing completions](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-005-prompted-marketing-language.md).

## The size

The second lever is the number of parameters, and this is where training leaves the CoCo. The model in this section is over a hundred times bigger than the one that trained on stage. The Mac trained it, and the CoCo only predicts. The screen says so: MAC TRAINED - COCO PREDICTS. The weights are loaded for inference, as they are when a previously trained model is deployed.

The model is a sentence completer, [EXP-007, the all-RAM sentence completer](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-007-all-ram-sentence-completion.md). It trained on 423 sentences about this computer:

```text
WELCOME TO THE WORLD OF RETRO COMPUTING.
WELCOME TO THE COLOR COMPUTER!
WELCOME HOME, COMPUTER FAN.
ARE YOU READY TO COMPUTE?
YES, THE COMPUTER IS READY.
NO, THE CASSETTE IS NOT READY.
PRESS ENTER TO START.
PRESS TAB TO COMPLETE THE PHRASE.
```

Its shape against the marketing model:

| | the marketing model | this one |
| --- | ---: | ---: |
| parameters | 380 | 32,385 |
| vocabulary | 38 tokens | 255 |
| context window | 2 tokens | 5 |
| trained on | this machine | the Mac, once |

The vocabulary is 255 because a token identifier is one byte, and that byte has to cover everything. One seat for the boundary, six for punctuation, and 248 for the words the sentences use most. A period is a token, sitting in the window like any word. That lets training associate punctuation with the end of a sentence and with what follows it. I chose what counts as a token, the same way I chose whole words back in post one.

<aside class="hardware-detail" aria-labelledby="completion-memory-title">

<h3 id="completion-memory-title">Inside the 6809: fitting the weights into RAM</h3>

The 32,385 parameters ship as 16,193 bytes, two four-bit values per byte. The [model unpacker](https://github.com/svetzal/coco-llm/blob/main/src/6809/completion_policy_exp7.asm#L20-L53) separates each pair, restores the sign and writes one parameter per byte into RAM. Packing saves space in the file; inference uses the expanded values.

The program switches the CoCo into all-RAM mode so it can use memory at addresses normally occupied by BASIC ROM. Keyboard polling still needs BASIC's routine, so the [keyboard wrapper](https://github.com/svetzal/coco-llm/blob/main/src/6809/completion_policy_exp7.asm#L55-L67) temporarily restores the ROM map, calls it, then returns to all-RAM mode. The beginning of that routine is:

```text
completion_policy_read_key
        sta     EXP7_SAM_ROM_MAP
        andcc   #$af
        jsr     [EXP7_POLCAT]
```

The map change exposes ROM; `ANDCC` restores the interrupt environment expected by BASIC; `JSR` calls its keyboard routine. The remaining instructions preserve the returned key while restoring the model's memory map. None of this changes the learned weights.

</aside>

You type, press the right arrow, and it ranks your next word. Type THE MODEL CAN and it offers SUGGEST, BE, REMEMBER. Type RUN THE PROGRAM with the period and the top suggestion is the end-of-phrase token: it has learned that a period is usually the end. (My first interface hid that token, because the same number also meant no suggestion. The model ranked the end token first, but the interface displayed a different suggestion. I fixed the interface without retraining.)

The window is still the window. Type I KNOW THE OLD MODEL CAN and note the three suggestions. Type WE KNOW THE OLD MODEL CAN and you get the same three, because the model sees five tokens and both I and WE fell out the far side. To this model those are the same sentence.

Here are those four phrases typed into the emulator at the real clock rate. The pause after each right arrow is the CoCo scoring 255 tokens.

<video controls preload="metadata" playsinline style="width: 100%; max-width: 640px; display: block; margin: 0 auto; image-rendering: pixelated;" src="/2026/images/coco-llm-4-completer.mp4">
The emulator running the sentence completer: THE MODEL CAN, then I KNOW and WE KNOW, then RUN THE PROGRAM with a period.
</video>

Did the larger completer improve the suggestions? I built two versions and measured both. The first was [EXP-006, the 8 KiB completion workbench](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-006-pretrained-tab-completion.md): 8,188 parameters, 178 tokens, a four-token window. The second is this one, four times the parameters. Both were scored on sentence completion using held-out text. Vocabulary, context width and punctuation changed too, so this compares two designs rather than isolating parameter count.

| | 8 KiB model | 32 KiB model |
| --- | ---: | ---: |
| the right word was in the top three | 59.3% | 60.0% |
| typing saved by accepting suggestions | 58.8% | 51.7% |

The larger design gained seven tenths of a point on the first line and lost seven points on the second. Its extra parameters supported a bigger vocabulary, a longer window and punctuation, but those additions did not improve both completion metrics.

Both of those were called shots, and both missed. The 8 KiB model was supposed to reach 70% on the first line and got 59.3. The 32 KiB model was supposed to save 60% on the second and got 51.7. I kept the prototypes and recorded both missed targets. The scores are offline simulations on held-out text; nobody has timed a person at the keyboard.

Size is a decision with a bill. More parameters retain more patterns. They do not add understanding, and they do not necessarily add skill at the thing you wanted.

## The training data

For the training-data comparison, I returned to computer names and held the model design fixed.

[EXP-003, the fan-corpus bias runs](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-003-training-data-bias.md), trains five models that are identical in every way but one. Same architecture, 310 parameters over a 31-token vocabulary. Same random starting numbers, seed 6809. Same 1,620 nudges. Same twenty seeds for the die when they draw. The only thing that differs is the training data.

For each of the first three runs, I used 18 names from one maker, with repeated examples:

```text
apple fan            commodore fan        tandy fan
APPLE II             COMMODORE 64         TANDY TRS-80
APPLE LISA           COMMODORE AMIGA      TANDY 1000
APPLE MACINTOSH      COMMODORE PET        TANDY COCO
```

Each one drew twenty names. I counted the first word:

| Training data | APPLE | COMMODORE | TANDY | other | one of the 20 |
| --- | ---: | ---: | ---: | ---: | --- |
| apple fan | 16 | 0 | 0 | 4 | APPLE MACINTOSH |
| commodore fan | 0 | 15 | 0 | 5 | COMMODORE AMIGA |
| tandy fan | 0 | 1 | 14 | 5 | TANDY COCO |

Each model gives more probability to the maker repeated in its training data. The Tandy-trained model still drew one COMMODORE. Training on Tandy names made the other makers unlikely, not impossible. The words were still in the vocabulary, and nothing in the weights fences a word off.

The last two isolate the order of the examples. Both train on all 54 names, 18 per maker, balanced. The only difference between them is the order of the file.

| Training data | APPLE | COMMODORE | TANDY | other | loss at the end |
| --- | ---: | ---: | ---: | ---: | ---: |
| all three, one block after another | 0 | 1 | 14 | 5 | 2.18 |
| all three, interleaved | 10 | 6 | 3 | 1 | 0.88 |

Laid end to end, Apple then Commodore then Tandy, the model comes out a Tandy fan: 14 of 20, the same as the model that only ever trained on Tandy. Every pass through the file ends with the Tandy block, so the final updates favour Tandy. Interleaved, the same 54 names spread out, and the loss finishes at 0.88 instead of 2.18. The bad order trained worse as well as narrower.

I deliberately compared those two orders. The fourth run shows how grouping examples by maker can produce a preference even when the totals are balanced.

The same lever has a commercial name. Fine-tuning is more training, on data somebody chose. A company fine-tuning a model on its own documents is choosing training data, and it inherits everything on this table, the order included.

## What each change controls

The prompt changes context while the weights stay fixed. A larger design changes what can fit in the model and what prediction costs. Training data and its order change the weights themselves. Those are different interventions, and the demonstrations let us check each one separately.

Next post: the same machinery on things that are not computer names. Sixteen episode titles that were never filmed, a game that learns how you play, a fact you hand it right now, and a tune.

<!-- Draft voice check (remove before publication): Names the interventions directly and keeps the interface repair as a concrete example. Removes invented surprise and attributes the ordering experiment to deliberate design. -->
