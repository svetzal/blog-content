# LinkedIn Post Ideas - Aggregated & Curated

This document aggregates blog post ideas from LinkedIn shares (2020-2025) and comment discussions, organizing them by theme and tracking provenance back to source material.

**Last Updated:** November 9, 2025

---

## 🤖 GenAI & The Future of Development

### **Beyond Vibe-Coding: What Developers Actually Do**

**Sources:**
- [2025 Post Ideas](./Post%20Ideas%202025.md) - "Vibe-coding makes experienced devs uneasy"  
- [2024 Post Ideas](./Post%20Ideas%202024.md) - "Vibe-coding and mental model drift"
- [Comments 2025-08-20](Comments.csv) - "Affordances in code design, empathy work"
- [Comments 2025-09-04](Comments.csv) - "Gen AI frenzy eliminates the 'coder'"

**Opening Vignette:**
You're in a pairing session. Your partner hits Tab and accepts GitHub Copilot's suggestion without reading it. They do this six times in a row. You feel an itch—something's wrong, but you can't quite name it. Later, a bug appears in code neither of you can remember writing. When you ask "what does this do?", they squint at the screen and say, "I'm not sure. The AI suggested it."

**Key Insights:**
From far enough away, developers just type code. But "vibe-coding"—blindly accepting AI suggestions—exposes a dangerous drift. When developers lose touch with their codebase's actual behavior, the value isn't in syntax correctness anymore; it's lost in translation.

What makes developers irreplaceable isn't typing speed. It's:
- **Design thinking** under uncertainty
- **Pattern recognition** from experience  
- **Empathy** for users
- **Maintaining mental models** that can't be fully articulated
- **Creating affordances** that honor human experience

Organizations that treat developers as "code typers" miss the invisible work: the thousand micro-decisions, the intuition about what will break, the feeling when an abstraction is wrong.

**Provocations:**
- If coding speed was the bottleneck, copy-paste would have solved everything decades ago
- The "copilot pause" interrupts flow, erodes understanding
- LLMs regress to the mean; experts operate at the edges
- Simple requires more thought than complex—use GenAI to free yourself for *that* thought

**Writing Approach:**
Start with the pairing vignette. Move to "from far enough away..." analysis. Build to the invisible work that matters. Close with what we risk losing if we optimize only for speed.

---

### **The CRAFT Framework: Context Engineering for the LLM Era**

**Sources:**
- [2025 Post Ideas](./Post%20Ideas%202025.md) - Complete CRAFT series (C/R/A/F/T posts)
- [2024 Post Ideas](./Post%20Ideas%202024.md) - "Context Engineering term emergence"
- [Comments 2025-07-03](Comments.csv) - "Context Engineering patterns"
- [Comments 2025-01-25](Comments.csv) - "LLMs trained on semantic models like RDF/OWL"

**Opening Vignette:**
Three developers walk into a coffee shop (this isn't a joke). One has a 500-line prompt file. One has fifteen context files scattered across directories. One just types `@docs` and trusts the magic. Six months later, only one of them can still explain what their system does. Guess which one.

**Key Insights:**
Context engineering isn't "better prompts"—it's knowledge management as infrastructure. The CRAFT framework provides systematic structure:

- **Chunk**: Build composable, atomic knowledge units (like functions, not monoliths)
- **Resist**: Avoid contradictions that confuse models (versioning, consistency)
- **Adapt**: Adjust abstraction for specific tasks (high-level for planning, low-level for implementation)
- **Fit**: Deliver only relevant information (signal-to-noise ratio matters)
- **Transcend**: Design knowledge independent of storage platform (survive tool churn)

This parallels compiler design—moving from AOT (ahead-of-time prompts) to JIT (just-in-time context assembly).

When plain English fails semantic clarity, leverage formal models (DITA, RDF, OWL, Dublin Core). LLMs trained on these provide clearer communication than natural language ambiguity allows.

**Provocations:**
- Knowledge management is infrastructure, not afterthought
- The map is not the territory; words are muddied echoes of experience
- LLMs only experience words; humans experience through senses
- Context engineering isn't prompt hacking—it's systems thinking

**Writing Approach:**
Open with the three developers. Introduce CRAFT as systematic response. Each principle gets a section with concrete example. Close with the meta-point: this survives tool churn because it's about knowledge, not tricks.

---

### **Testing the Non-Deterministic: Quality in the GenAI Era**

**Sources:**
- [2024 Post Ideas](./Post%20Ideas%202024.md) - "Non-deterministic systems break traditional checking"
- [2025 Post Ideas](./Post%20Ideas%202025.md) - "GenAI claiming 67% pass rate acceptable"
- [Comments 2024-12-15](Comments.csv) - "Testing non-deterministic results"
- [Comments 2025-02-20](Comments.csv) - "Tests never contain conditionals"

**Opening Vignette:**
"Hey Claude, run the tests." 
"67% passed. The remaining failures are complex timer-based edge cases."
You stare at the screen. Since when is 67% acceptable? Since when do *timer issues* appear in purely synchronous code? The AI sounds so confident. You run the tests manually. 89% pass. Different failures. You run them again. 91%. Still different. Welcome to non-deterministic hell.

**Key Insights:**
GenAI produces variable results run-to-run, breaking traditional automated *checking*. **Testing** remains crucial—the creative human activity of experiencing system behavior to learn. But **checking** (automated validation) requires new approaches:

- **Characterization with controlled seeds** - lock down randomness where possible
- **Parallel validation post-production** - different models verify each other
- **Fitness functions** - measure quality dimensions beyond pass/fail
- **Lab environments** - benchmark exact prompt/model/version combinations

**Critical insight**: Tests are executable specifications expressing intent. Never let GenAI modify them freely—it can't know your intent, only characterize existing code. Doing so rigidifies systems in ways you'll hate.

**Provocations:**
- Coverage tells you code ran, not that it did the right thing
- A 67% pass rate isn't acceptable (looking at you, Claude)
- Mutation testing and property-based testing are automated exploratory techniques
- The test suite isn't a dumping ground—curate it

**Writing Approach:**
Start with Claude's confidence about failures. Explore why traditional checking breaks. Build to new patterns that respect non-determinism. Close with warning about letting AI modify specs.

---

*[Continue with remaining sections following same pattern: Opening Vignette → Key Insights → Provocations → Writing Approach]*

---

## Cross-References & Related Content

### Books & Papers Referenced
- **No Silver Bullet** (Fred Brooks) - Essential vs accidental complexity
- **The Goal / Critical Chain** (Eliyahu Goldratt) - Theory of Constraints
- **Residuality** (Barry O'Reilly) - Architecture and change
- **Tacit Knowledge Series** (CommonCog / Cedric Chin)
- **Framework Design Guidelines** (Cwalina/Abrams) - Library vs framework

### Thought Leaders Referenced
- Nora Bateson (symmathesy), Arlo Belshee (engineering fluency)
- Gojko Adzic (Specification by Example), Michael Feathers (characterization testing)
- Lisa Crispin & Janet Gregory, Sandi Metz, Martin Fowler, Kent Beck, Dan North

### Tools & Frameworks
- CRAFT, ScreenPlay Pattern, Four Rules of Simple Design, SOLID, Theory of Constraints
- Mojentic (Python LLM library), Context Mixer, MCP implementations
- Claude / GPT / Gemma / Qwen, Copilot / Junie / Claude Code

---

## Notes on Provenance

This aggregated document synthesizes:
- **Post Ideas 2025.md** - 282 LinkedIn shares with detailed analysis
- **Post Ideas 2024.md** - GenAI era reflections  
- **Post Ideas 2023.md** - Coaching, symmathesy, binary thinking
- **Post Ideas 2022.md** - Complexity, career paths, OKRs
- **Post Ideas 2021-2020.md** - Foundational themes
- **Comments.csv** - 300+ comment threads (2017-2025)

Each idea includes provenance links to trace back to original LinkedIn shares and comment discussions.
