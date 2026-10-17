---
title: "Titles, a game, a fact, and a tune"
date: 2026-09-27
published: false
description: "Post five of five: the same arithmetic pointed at other things. Sixteen episode titles that were never filmed, a game opponent that updates counts during play, a fact you hand it right now without training, and a tune it finishes from the bar you give it. Then what the whole thing is for."
tags:
  - ai
  - coco
  - "6809"
  - learning
---

[Last post](https://stacey.vetzal.ca/2026/2026-09-25-the-prompt-the-size-the-training-data/) covered three levers, with the loop held fixed:

- The prompt. Two starting words steer the output and change nothing in the model. Generating a completion does not update the weights.
- The size. Four times the parameters attempted more and was not better at what it already did.
- The training data. The training examples changed which maker appeared most often; grouping a balanced file by maker favoured the last block.

This post is the rest of the exhibit table. I used the next-token loop for titles and music, a count table for a game, and a small attention head for retrieving a value from context. Each makes a different mechanism visible.

## Sixteen titles that were never filmed

The training data is 79 Star Trek episode titles, every one of them real. THE CAGE. THE MAN TRAP. WHERE NO MAN HAS GONE BEFORE. THE TROUBLE WITH TRIBBLES. I chose familiar titles so a viewer could compare the inventions with the source material.

Those 79 titles are a bad training set for the loop as it stands, and [the measurement says why](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-012-episode-titles.md#L55-L128). 259 words, 180 tokens, and 162 of those tokens appear exactly once. Across the whole corpus only two adjacent word pairs ever repeat: OF THE, six times, and IN THE, twice. Every other pair happens once and never again. A model that learns which token follows which has almost nothing here that happens twice, so repeated training strongly favours reproducing those individual sequences.

I separated the title shapes from their names so the training data would contain repeated patterns:

```text
THE SQUIRE OF GOTHOS        THE <X> OF <X>       SQUIRE, GOTHOS
A TASTE OF ARMAGEDDON       A <X> OF <X>         TASTE, ARMAGEDDON
THE TROUBLE WITH TRIBBLES   THE <X> WITH <X>     TROUBLE, TRIBBLES
```

The 79 titles reduce to 32 shapes, giving the training data repeated patterns. Training on those shapes produces 400 bytes of parameters. I put the 113 names in a separate, manually assembled dictionary occupying 1,333 bytes. Three written constraints occupy another 258 bytes:

1. A word may only follow a word it actually follows somewhere in the real titles. Without this rule it writes TRISKELION THE MAN TRAP.
2. A name only goes into a gap if it fits the words on either side. Without this rule it writes A TRIBBLES.
3. It holds a fingerprint of all 79 real titles and throws away any match. It is never allowed to deal a real title as its own.

The model proposes a shape, the rules throw out anything the real titles never did, and the dictionary fills the gaps. From BALANCE OF TERROR it kept BALANCE OF and dealt BALANCE OF BABEL, BABEL lifted from JOURNEY TO BABEL. Here is one screen, [sixteen titles as the machine dealt them](https://github.com/svetzal/coco-llm/blob/main/presentation/deck/data/titles.json):

```text
JOURNEY IN THE CAGE              METHUSELAH FOR ZETAR
PLATO'S STEPCHILDREN TO TERROR   SHORE LEAVE OF LIGHTS
METAMORPHOSIS OF GAMESTERS       ELAAN OF ARCHONS
ERRAND TO CLOUD MINDERS          PLATO'S STEPCHILDREN TO ELAAN
YESTERDAYS ON THE TASTE          BALANCE TO MUDD
PLATO'S STEPCHILDREN TO MERCY    BALANCE OF BABEL
ARENA OF METHUSELAH              PARADISE OF SPOCK'S BRAIN
GIDEON TO TRUTH                  PLATO'S STEPCHILDREN TO MIRI
```

Here it is dealing, recorded from the emulator at the real clock rate. A screen takes about ten seconds; each keypress deals a fresh one.

<video controls preload="metadata" playsinline style="width: 100%; max-width: 640px; display: block; margin: 0 auto; image-rendering: pixelated;" src="/2026/images/coco-llm-5-titles.mp4">
The emulator dealing two screens of sixteen invented titles.
</video>

The Mac trained the model for eleven epochs. That limit affects the output: compared with a sixty-epoch reference run, it produces more bare-name shapes and fewer THE something OF something shapes.

<aside class="hardware-detail" aria-labelledby="titles-score-width-title">

<h3 id="titles-score-width-title">Inside the 6809: when a score outgrows sixteen bits</h3>

The CoCo adds each score in sixteen bits. In this title model, [the twelve-epoch run exceeded that range](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-012-episode-titles.md#L261-L293), so the score could wrap and disagree with the wider reference arithmetic. I capped training at eleven epochs to keep the two implementations in agreement.

The [exporter's score-bound calculation](https://github.com/svetzal/coco-llm/blob/main/tools/export_exp_012.py#L55-L81) examines every pair of context tokens and measures the largest score magnitude. This checks a numeric limit, not title quality. The [shared forward pass](https://github.com/svetzal/coco-llm/blob/main/src/6809/model_forward.asm#L63-L114) contains the score accumulation that imposes the limit.

</aside>

The learned parameters occupy 400 bytes. The dictionary and constraints are separate, written components, and the result depends on all of them. These titles would be errors in an episode catalogue; for this demonstration, invention is the task.

## Now you play it

For rock, paper, scissors, lizard, Spock, I started with empty tables for the rules and the player's next throw.

There is no gradient in this one. [EXP-013, the game opponent that learns](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-013-rpsls-opponent.md), is two tables and 100 bytes:

- The rules: 25 cells, one per pair of throws. Each starts unknown and becomes loss, tie or win the first time that pair is played. The game engine supplies each round's outcome, which updates the corresponding cell.
- Player history: the five possible previous throws combine with the three possible previous outcomes to make 15 contexts. Each context stores five counts, one for each possible next throw. After a round, the program increments the count for your actual throw in the context that preceded it.

Before you throw, the screen displays the predicted move. The program chooses a recorded winning response, otherwise an untested pair, otherwise a tie. Each round increments one count in the player-history table. This is a conditional-frequency Markov predictor.

As throw pairs occur, their outcomes fill the rules table. The player-history counts keep changing during play. Press R and both tables empty on screen, so you can compare play before and after the reset.

I tested synthetic players and recorded a 200-round human session:

| Against | Score (tie counts as half) |
| --- | ---: |
| six synthetic players, five of them with a habit | 80.0% |
| me, 200 rounds, trying | 52.8% |

The score counts each win as one and each tie as half; 50% means equal wins and losses. The predictor named my next throw 29.6% of the time against a 20% chance rate, but its 52.8% score did not establish an advantage over me. I avoided repeating throws; the synthetic player with that behaviour was also the hardest, at 56%. Five of the six synthetic players had more exploitable habits. Their average overstated how well the opponent performed in this human session.

Why a table and not a model? Because I tried the model first. [EXP-008, the rejected adaptive opponent](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-008-adaptive-opponent.md), put a next-token model against a 90-byte table on recorded human play, and the table won. I used the table because it performed better in that comparison and updates with an increment. This demo does not use a neural language model.

## A fact you hand it right now

The names model stores patterns in weights; the game updates counts during play. For this demonstration I held the weights fixed and made a context record editable.

The screen shows eight records in context RAM and a question:

```text
1. TEMPORARY CONTEXT IN RAM
MODEL 751B       WEIGHTS LOCKED
  AMIGA           = CODE 7
> LISA            = CODE 2
  TRS-80          = CODE 5
  ARCHIMEDES      = CODE 1
  PET             = CODE 4
  MACINTOSH       = CODE 0
  SPECTRUM        = CODE 6
  ATARI ST        = CODE 3

QUESTION: LISA
```

Press Enter: ANSWER: CODE 2. Press E, type 6, and one byte in context RAM changes: LISA = CODE 6. The weights did not change, and the screen says so. Press Enter again: ANSWER: CODE 6.

<video controls preload="metadata" playsinline style="width: 100%; max-width: 640px; display: block; margin: 0 auto; image-rendering: pixelated;" src="/2026/images/coco-llm-5-attention.mp4">
The emulator: Enter answers CODE 2, E and 6 change the context record, Enter answers CODE 6.
</video>

Lisa's code varies across the training examples, so a fixed answer associated with Lisa cannot solve the task. The prediction must depend on the current context record. [EXP-011, the context-editing attention head](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-011-contextual-associative-recall.md), does it with two small tables: a query row for each name and a key row for each name, both learned. For each record, multiply corresponding query and key values and add the products to obtain a score. Select the record with the highest score and copy its stored value. This simplified attention head has 160 parameters and no value matrix. It selects the highest-scoring record rather than taking a weighted sum of values. It answered correctly on all 4,096 held-out bindings. A lookup stored in the parameters, with no way to read the context, scored 12.18%, about chance.

The names model has no attention. I added this separate demonstration to show how learned queries and keys can select information supplied at prediction time. Changing CODE 2 to CODE 6 changes the answer without retraining. The mechanism retrieves the supplied value; it does not verify whether that value is true.

## A token is a note

For melody continuation, I changed the tokens from words to musical events and retained the next-token objective.

The Mac trained this melody model; the CoCo generates and plays the continuation. The training data is Ryan's Mammoth Collection, published in Boston in 1883: 1,050 reels and jigs. I used 376 tunes, represented on a grid where every row is a sixteenth note. Of those, 313 formed the training data and 63 were held back for testing.

```text
42D HIGHLAND REGIMENT   minor 4/4   19 . 15 12 . . 12 . 14 . 15 12 . . 12 .
7TH REGIMENT            major 2/4   12 . 12 16 19 12 16 19 24 16 19 24 28 . 26 24
```

A number gives the pitch's distance above the tonic, measured in semitones. A dot continues the previous note; R represents a rest. The melody vocabulary has 34 musical-event tokens, compared with the names model's 29 word and boundary tokens.

The pitch tokens are chromatic distances from the tonic, so they can include notes outside the diatonic scale. The representation does not make a wrong note impossible. I supplied mode, metre, beat and chord as context rather than asking the model to infer that structure from the preceding notes alone. Training adjusts the probabilities of melodic continuations given that context. Those chords were inferred from the melodies by a rule I wrote, so they are a derived feature and not ground truth. The model and the count-table baseline used the same inferred chords. With that input held constant, the model beats the best table by [0.494 bits per row](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-010-melody-continuation.md#L503-L545) on the held-out tunes. The table scored better on contexts present in its training data. The model scored better on unseen contexts, which accounted for 93% of the held-out rows.

At the table you enter eight notes on the number keys, and the keys are scale degrees, so the seed stays within the supplied scale. The same loop as post one, predict the next token and write it down, composes the rest. The bass, the arpeggio and the drums are rules a person wrote that follow the chords, the same arrangement as the title machine. Then it plays. Playing four voices takes every cycle the machine has, so it composes the tune into memory first, then performs it.

Here is one, with sound. This is the CoCo 1 build under the emulator at the real clock rate, so the performer is the 4,566-samples-a-second one. The seed is 1 2 3 5 5 3 2 1, in yellow; THINKING is the screen label during generation, about five seconds; the rest is the tune it wrote.

<video controls preload="metadata" playsinline style="width: 100%; max-width: 640px; display: block; margin: 0 auto; image-rendering: pixelated;" src="/2026/images/coco-llm-5-melody.mp4">
The emulator composing a tune from an eight-note seed and playing it.
</video>

<aside class="hardware-detail" aria-labelledby="steady-clock-title">

<h3 id="steady-clock-title">Inside the 6809 / 6309: a steady sample clock</h3>

The performance is its own experiment, and it was heard on the CoCo 3 through a Commodore 1703 monitor on 6 September 2026. The first player had a warble on the melody, and [EXP-018, the steady sample clock](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-018-steady-sample-clock.md), removed it by making every sample cost the same number of cycles. On the 6309 at the fast clock that is 11,188 samples a second; the CoCo 1 build plays the same tune at 4,566.

The [sample loop](https://github.com/svetzal/coco-llm/blob/main/src/6809/steady_player.asm#L194-L243) writes a sample to the sound hardware, then either applies a scheduled event or takes a padding path of equal duration. Its event decision starts with:

```text
                sta     PIA1_DA
                dec     <tick_samples
                bne     idle
```

`STA` writes the sample. `DEC` counts down to the next event; `BNE` takes the idle path while the count is nonzero. Padding that path keeps the next sample on time even when there is no event to apply. The source carries separate cycle counts and padding for the 6809 and 6309. The [cycle-path checker](https://github.com/svetzal/coco-llm/blob/main/tools/music_cycle_budget.py) supports inspection of those processor timings.

</aside>

## The same thing, in the usual symbols

The names model is a log-bilinear language model in the sense of Mnih and Hinton (2007). Each window position has a separate input embedding table; the output-weight table is independent of those input tables. The forward pass adds the selected embeddings, applies a linear layer and computes softmax probabilities. Training uses cross-entropy loss and stochastic gradient descent, one example per update, with a constant learning rate of one sixteenth.

The backward pass applies the chain rule to compute gradients from the loss. First, subtract the one-hot target from the predicted probabilities to obtain the score gradient. Then multiply the transpose of the output-weight matrix by the score gradient to obtain the context-vector gradient. It is backpropagation through a single linear layer. What you will not find: a hidden layer or an activation, attention in the main model, normalization, residuals, Adam, a schedule, a KV cache. The [concept map](https://github.com/svetzal/coco-llm/blob/main/presentation/concept-map.md#for-readers-who-know-the-classic-form) has the derivation and the list of what appears under another name.

## What it is for

Prediction is not understanding. The names model learned that AMIGA plausibly follows COMMODORE without anything in it holding that either one was a company or a product. Checking whether an output is true needs evidence outside this prediction loop: a source, a test, a tool, or a person who knows what is at stake.

The parameters are not a database of sentences. Training the 290 parameters on eighteen names produced patterns that could generate new names. Longer training increased exact reproduction of training names. The training duration changed that balance.

Useful is not the same as correct. The sentence completer saved half the typing while its top three suggestions missed the word four times in ten. The game opponent predicted my moves above chance without establishing a winning advantage.

For the names demonstration, I counted output as successful when it was new and had the right shape. The training loop optimizes a different criterion: the probability assigned to the training targets. The checkpoint scores showed those criteria diverging. I remain responsible for judging whether the output serves the demonstration; lowering loss does not make that judgment.

This model shares the next-token learning objective used by modern generative language models, but not their transformer architecture or scale. It is the same loop at a size where every part is visible.

The practical move is the same at every scale: give a model a bounded job, relevant context, and a way to check the result.

The code and experiment records are at [svetzal/coco-llm](https://github.com/svetzal/coco-llm), and the demonstrations run on a Mac with XRoar. Change the training data, predict what will change, and compare the output. The same measurements that support these claims give you a way to check them.

<!-- Draft voice check (remove before publication): Distinguishes learned parameters, context, counts and written rules. Cuts borrowed audience reactions, personification and closing ornament; keeps the recorded results and limitations. -->
