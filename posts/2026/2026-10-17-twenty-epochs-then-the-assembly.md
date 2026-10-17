---
title: "Twenty epochs, then the assembly"
date: 2026-10-17
published: true
image: "images/coco-llm-3-banner.png"
imageAlt: "An illustration of a silver-haired woman marking checkpoint 20 on a fanfold printout beside a separate assembly listing, a worn silver Color Computer and a beige CRT, under green, cyan and magenta light."
description: "Post three of five: what 1,160 nudges do to the model, checkpoint by checkpoint, and then the 6809 instructions that do one of them: two unsigned multiplies, one subtraction, and four shift pairs."
tags:
  - ai
  - coco
  - "6809"
  - learning
---

[Last post](https://stacey.vetzal.ca/2026/2026-09-21-where-the-numbers-live/) covered:

- The two tables. One row of three numbers per token, one table per window position. Fetch a row from each, add them, and those three numbers are the model's whole input.
- The scoreboard. Three weights and a bias per token, 116 numbers, that turn the input into a score for every token. With the 174 in the tables, that is the 290.
- Scores become shares. On the CoCo they add up to 256, and one drawn byte picks the next token.
- One update. The prediction error is predicted probability minus target probability. For an output weight, multiply that error by the learning rate and the corresponding context value, then subtract the result from the weight. Training also updates the biases and the embedding rows used by the example.

I chose twenty epochs for the live demonstration: 1,160 training steps. The checkpoint scores show why I stopped there; the assembly shows what each step costs.

## Twenty times through

An epoch is one pass through the 58 examples. The demonstration trains for twenty epochs. At a few points along the way I stopped the reference model on the Mac, drew 200 names from it, and scored them. Here is what came out, [two draws per checkpoint](https://github.com/svetzal/coco-llm/blob/main/tools/export_deck_traces.py#L259-L290), with the loss the training loop reported at that point:

| Epoch | Loss | Two of the 200 draws |
| ---: | ---: | --- |
| 0 | 3.26 | II APPLE COMMODORE ACORN 64 II / ARCHIMEDES ARCHIMEDES ARCHIMEDES 400 SINCLAIR COLOR |
| 1 | 3.04 | II APPLE BBC 64 100 COMMODORE / ARCHIMEDES ARCHIMEDES AMIGA |
| 5 | 2.42 | COMPUTER ARCHIMEDES / ATARI ATARI |
| 20 | 1.83 | SINCLAIR AMIGA / COMMODORE ATARI |
| 60 | 1.27 | SINCLAIR BBC / COMMODORE 64 |

The loss falls the whole way. It measures how wrong the guesses are, and by that measure epoch 60 is the best model in the table. Post one showed why I stopped at twenty anyway: at sixty, 143 of the 200 draws were names from the training data, word for word.

Repeating a token goes first. At epoch 0, 83 of the 200 draws say the same word twice, ARCHIMEDES ARCHIMEDES ARCHIMEDES. After one pass it is 70. After five, 19. At twenty, 3.

The shape comes second. I wrote down [what a name looks like](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-002-token-model-feasibility.md#L125-L170) before I drew a single sample: two to four tokens, and the first one is a maker, one of ACORN, APPLE, ATARI, COMMODORE, SINCLAIR or TANDY. That is a crude test; TANDY TANDY TANDY passes it. I wrote it before drawing anything so it could not be bent toward a result. One draw in 200 passes it at epoch 0, 12 after one pass, 109 after five, 197 at twenty. At sixty epochs, 199 of 200 draws pass this shape test, but far fewer are new names.

Copying comes last. Nothing at epoch 0 or epoch 1 is a training name. At five, 5 of the 200 are. At twenty, 18. At sixty, 143. Further training increased the probabilities of the observed continuations, making complete training names more likely to be sampled.

| Epoch | Repeats a token | Right shape | In the training data | New and the right shape |
| ---: | ---: | ---: | ---: | ---: |
| 0 | 83 | 1 | 0 | 1 |
| 1 | 70 | 12 | 0 | 12 |
| 5 | 19 | 109 | 5 | 104 |
| 20 | 3 | 197 | 18 | 179 |
| 60 | 0 | 199 | 143 | 56 |

I wanted new names with the right shape, so I scored that separately from loss. That column peaks in the middle. Loss rewards higher probability for the training targets, even when further training makes the output less useful for inventing names. I ran a longer sweep [out to 120 epochs](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-002-token-model-feasibility.md#L125-L170), and the useful band is about 13 to 25; fifteen scores 93% against twenty's 90%. Twenty is the number the CoCo build has baked in, so the post and the machine agree.

## What twenty epochs cost

I kept the model at 290 parameters and the run at 20 epochs to fit the demonstration on a stock CoCo 1.

Each example takes 261 multiplies. With 58 examples per pass and 20 passes, training takes 302,760 multiplies. The full run executes 15.8 million instructions. The calculation and the emulator at the 1981 clock rate put training at a little over a minute. I have timed the full training run several times on physical hardware, with the same result.

Inference needs 2,516 bytes for the forward pass, sampling and the 580 bytes of weights. Training requires another 730 bytes for its update code, training examples and progress display. Those additional bytes are not needed for inference. A released set of weights likewise does not include the entire system used to train it.

The model uses fixed-point numbers: integers that stand for fractions. Updates can lose fractional precision, a form of quantization. The processor details below show where that precision goes and how the CoCo executes the update.

<aside class="hardware-detail" aria-labelledby="hardware-detail-title">

<h2 id="hardware-detail-title">Inside the 6809 / 6309</h2>

This section follows the processor instructions for multiplication and weight updates. [Continue to the next post](#after-hardware-detail) if you're following the model explanation.

### The multiply

The 6809 has one multiply instruction, `MUL`. It takes two bytes, each 0 to 255, and produces their product, 0 to 65,025. Eleven clock cycles. It treats both inputs as unsigned.

The weight update multiplies a context value by a prediction error. Either factor can be negative, so the multiplication must handle signed numbers. My first version did it the way you would on paper, one bit at a time. It was correct, it was easy to read, and the run took 38.6 million instructions. Here is what replaced it, [from the source](https://github.com/svetzal/coco-llm/blob/main/src/6809/model_forward.asm#L280-L295):

```text
multiply_s8_s16
        sta     multiply_factor
        ldb     1,x
        mul
        std     multiply_product
        lda     multiply_factor
        ldb     ,x
        mul
        addb    multiply_product
        stb     multiply_product
```

The routine uses two `MUL` instructions to multiply an eight-bit factor by a sixteen-bit operand. First, multiply the factor by the operand's low byte and keep both result bytes. Next, multiply the factor by the operand's high byte. Add the low byte of this second product to the high byte of the first product. The combined result contains the low sixteen bits of the multiplication. The run dropped to 15.8 million instructions with every one of the 580 trained bytes unchanged.

Here it is on a step from the run. [At epoch 5, example 37](https://github.com/svetzal/coco-llm/blob/main/tools/export_shift_trace.py), the model was nudging SINCLAIR's third weight. The context value was 26 and the prediction error was -244. In the sixteen-bit representation, -244 has a high byte of 255 and a low byte of 12.

```text
26 x  12 =   312   bytes   1 :  56
26 x 255 = 6630   bytes  25 : 230
                          ---
add 230 to the 1:        231 :  56
```

A high byte of 231 and a low byte of 56 represent the signed sixteen-bit value -6,344. That matches 26 × (-244). The second product's high byte, 25, was never stored. The routine keeps the low sixteen bits of the signed product. I checked the low sixteen bits against the true signed product for all 16,777,216 possible input pairs, with [no mismatches](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-014-6309-multiplier.md#L174-L185).

A negative eight-bit factor needs a sign correction. The routine's [last five lines](https://github.com/svetzal/coco-llm/blob/main/src/6809/model_forward.asm#L290-L295) fix it:

```text
        tst     multiply_factor
        bpl     multiply_ready
        lda     multiply_product
        suba    1,x
        sta     multiply_product
```

For a negative eight-bit factor, `MUL` uses its unsigned interpretation. For example, -121 and 135 have the same eight-bit representation. Using 135 instead of -121 adds 256 times the other operand to the product.

To correct the low sixteen bits of the result, subtract the other operand's low byte from the product's high byte. Multiplying by 256 shifts a byte into that high-byte position; the other operand's high byte shifts beyond the sixteen-bit result and can be discarded. For -121 × 60, `MUL` calculates 135 × 60 = 8,100, with a high byte of 31 and a low byte of 164. For the high byte, 31 - 60 = -29, stored as 227 after eight-bit wraparound. The low byte remains 164. Those bytes represent -7,260. (That pair is a worked example, not a step from the run; it sits inside the range the run measured.)

### The learning rate, in eight instructions

The context value multiplied by the prediction error gives a gradient of -6,344 in the fixed-point representation. The learning rate scales this gradient before the weight is updated. I chose 0.0625, or one sixteenth, and [here it is](https://github.com/svetzal/coco-llm/blob/main/src/6809/training.asm#L133-L140):

```text
        asra
        rorb
        asra
        rorb
        asra
        rorb
        asra
        rorb
```

Register A holds the high byte of the sixteen-bit gradient; register B holds the low byte. `ASRA` shifts A one bit to the right, keeps its top bit where it was, and drops the bit that fell off the bottom into a flag called the carry. `RORB` shifts B one bit to the right and pulls the carry in at the top. Together they move all sixteen bits one place right, which halves the number. Four pairs divide by sixteen.

| | Bits | Value |
| --- | --- | ---: |
| the gradient | `11100111 00111000` | -6,344 |
| after one pair | `11110011 10011100` | -3,172 |
| after two | `11111001 11001110` | -1,586 |
| after three | `11111100 11100111` | -793 |
| after four | `11111110 01110011` | -397 |

The sign bit remains 1 after each shift. Each row in the table has one more leading 1 than the previous row. That is the "arithmetic" in arithmetic shift, and it is what keeps the number negative as it halves. The other shift instruction, the logical one, would put a 0 there and turn -6,344 into 29,596.

Shifting also discards the lowest bit. The first three pairs drop a 0. The fourth drops a 1, and nothing collects it. -6,344 / 16 = -396.5; the shifts round down to -397. That missing half is the bit that fell off. I used fixed-point arithmetic so the CoCo can train with integer instructions. Discarding fractional precision is quantization; this step shows exactly where it happens.

SINCLAIR's stored weight changes from 683 to 1,080: 683 - (-397) = 1,080. On the CoCo, the stored integer represents a weight multiplied by 4,096. Dividing by 4,096 gives the weight: 683 represents approximately 0.1667, and 1,080 represents approximately 0.2637. The decimals in the last post came from the Mac's floating-point reference. The CoCo uses fixed-point values, checked byte for byte against a separate reference that reproduces its integer arithmetic.

The rate of one sixteenth lets the update use shifts instead of a general division routine. Each `ASRA` or `RORB` takes two cycles. A rate of one eighth would use three shift pairs instead of four.

### The same bits, two readings

Look at the two routines side by side. `MUL` read -121 as 135. `ASRA` read -6,344 as negative and kept the sign. Same kind of bits in both cases; the sixteen bits of -6,344 read as 59,192 if you take them unsigned. The bit pattern alone does not specify a signed or unsigned interpretation. `MUL` treats its inputs as unsigned; `ASRA` preserves the sign bit. That difference is why the multiply needs a correction and the shift does not.

### The chip that has the instruction

The CoCo 3 on my exhibit table has a Hitachi 6309 in it. It runs 6809 code as it is, and in its own native mode it has instructions the 6809 does not. One of them is `MULD`, a signed 16-by-16 multiply, in one instruction.

On that chip, `MULD` handles the sign directly. [Sixteen instructions and 93 cycles become five and 43](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-014-6309-multiplier.md#L63-L81). I measured it on the physical machine on 5 September 2026: 58,000 multiplies over the trained model's weights, timed with the 60 Hz frame counter, [comparing the 6809 routine, native-mode execution and MULD](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-014-6309-multiplier.md#L83-L110).

| What ran | Ticks | Against the first row |
| --- | ---: | ---: |
| 6809 code, run as a 6809 | 519 | 1.00x |
| same code, 6309 native mode | 442 | 1.17x |
| the 6309's MULD instruction | 338 | 1.54x |
| MULD at double clock | 168 | 3.09x |

Every row computed the same checksum as the Mac. Running the original code in native mode gives a 1.17x speedup; using `MULD` raises the measured speedup to 1.54x.

That is the multiply, timed on its own. The multiply is [about 46%](https://github.com/svetzal/coco-llm/blob/main/experiments/EXP-014-6309-multiplier.md#L153-L172) of the training run, so on the whole run `MULD` should be worth about 1.26x, and I have not measured that. The measured speedup applies to the multiply benchmark. The rest of the training loop limits how much that instruction can improve the whole run.

</aside>

<p id="after-hardware-detail">Next post: how prompts, model size and training data affect the output.</p>
