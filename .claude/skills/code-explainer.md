---
name: code-explainer
description: Explain code in simple, beginner-friendly terms. Use when the user asks "what does this do", "explain this code", "how does this work", or when they seem confused about code functionality.
---

# Code Explainer Skill

When explaining code, use a teaching approach that's friendly and accessible.

## Explanation Structure

### 1. High-Level Overview
Start with what the code does in plain English:
- "This function calculates the total price of items in a shopping cart"
- "This class manages user authentication"
- "This loop finds all even numbers in a list"

### 2. Break It Down Step-by-Step
Walk through the code line by line or section by section:

```
For each line/section:
1. What it does (in simple terms)
2. Why it's needed
3. What happens next
```

### 3. Use Analogies
Explain complex concepts with real-world analogies:
- "A function is like a recipe - you give it ingredients (inputs) and it produces a dish (output)"
- "A loop is like doing your homework problems - you repeat the same process for each problem"
- "A variable is like a labeled box where you store information"

### 4. Highlight Important Concepts
If the code uses important programming concepts, explain them:
- Loops (for, while)
- Conditionals (if/else)
- Functions/methods
- Classes and objects
- Data structures (arrays, dictionaries, etc.)
- Async/await, promises
- Error handling

### 5. Point Out Potential Issues
If you see problems, mention them gently:
- "This could cause an error if the array is empty"
- "This might be slow with large datasets"
- "There's a potential security issue here"

### 6. Suggest Improvements (Optional)
If the code could be better, show how:
- "This could be simplified using..."
- "A better approach might be..."
- "This could be more readable if..."

## Teaching Style Guidelines

**DO:**
- Use simple, everyday language
- Provide examples
- Build from simple to complex
- Encourage questions
- Be patient and supportive
- Relate to real-world scenarios

**DON'T:**
- Use excessive jargon without explaining it
- Assume knowledge of complex concepts
- Be condescending
- Skip important details
- Make the user feel bad for not understanding

## Example Explanation Format

```
# What This Code Does:
[High-level summary]

# Step-by-Step Breakdown:
1. [Line/section 1 explanation]
2. [Line/section 2 explanation]
...

# Key Concepts Used:
- [Concept 1]: [Simple explanation]
- [Concept 2]: [Simple explanation]

# In Plain English:
[Analogy or real-world comparison]

# Potential Issues:
[Any problems you notice]

# How You Might Use This:
[Practical example]
```

## Difficulty Levels

Adjust your explanation based on the user's level:

**Beginner:**
- Explain everything, even basic concepts
- Use lots of analogies
- Show examples of similar code
- Encourage experimentation

**Intermediate:**
- Focus on why, not just what
- Discuss design patterns
- Compare different approaches
- Highlight best practices

**Advanced:**
- Discuss performance implications
- Explain architectural decisions
- Suggest optimizations
- Reference advanced concepts

## Interactive Approach

After explaining, ask:
- "Does this make sense?"
- "Would you like me to explain any part in more detail?"
- "Should I show you an example of how to use this?"
