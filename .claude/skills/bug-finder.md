---
name: bug-finder
description: Identify common bugs, errors, and potential issues in code. Use when the user asks to "find bugs", "debug this", "why isn't this working", or when analyzing code for problems.
allowed-tools: [Read, Grep, Glob]
---

# Bug Finder Skill

A systematic approach to finding and diagnosing bugs in code.

## Bug Hunting Checklist

### 1. Common Logic Errors

**Off-by-One Errors:**
- Array indices (starting at 0, not 1)
- Loop boundaries (< vs <=)
- String slicing ranges

**Null/Undefined Issues:**
- Variables that might be null
- Missing null checks
- Undefined object properties
- Empty array/string handling

**Type Mismatches:**
- Comparing strings and numbers
- Boolean vs truthy/falsy values
- Implicit type conversions
- Missing type checks

**Scope Issues:**
- Variables declared in wrong scope
- Closure problems
- Variable shadowing
- Global variable conflicts

### 2. Common Runtime Errors

**Array/List Issues:**
```javascript
// Bug: Accessing array that might be empty
const first = myArray[0]; // What if myArray is empty?

// Bug: Modifying array while iterating
for (let item of array) {
  array.push(item); // Infinite loop!
}

// Bug: Index out of bounds
const item = array[array.length]; // Should be length - 1
```

**Object/Dictionary Issues:**
```javascript
// Bug: Accessing property that might not exist
const value = user.profile.email; // What if profile is undefined?

// Bug: Wrong property name (typo)
const name = user.userName; // Should it be user.username?
```

**String Issues:**
```javascript
// Bug: Case sensitivity
if (input === "yes") // What if user types "Yes" or "YES"?

// Bug: Whitespace
if (input === "hello") // What if there's extra whitespace?
```

### 3. Async/Concurrency Issues

**Missing await:**
```javascript
// Bug: Not awaiting async function
const data = fetchData(); // Missing await!
console.log(data); // Will log a Promise, not the data
```

**Promise chains:**
```javascript
// Bug: Not returning promise
.then(() => {
  doSomething(); // Should return this!
})
```

**Race conditions:**
- Multiple async operations modifying same data
- Order-dependent operations
- Missing locks or semaphores

### 4. Edge Cases to Check

**Empty inputs:**
- Empty strings: `""`
- Empty arrays: `[]`
- Empty objects: `{}`
- Null or undefined
- Zero values

**Boundary values:**
- Maximum/minimum numbers
- Very long strings
- Very large arrays
- First/last elements

**Special characters:**
- Spaces and whitespace
- Unicode characters
- Special symbols
- Escape characters

### 5. Security Issues

**Injection vulnerabilities:**
- SQL injection (unescaped user input in queries)
- XSS (unescaped HTML in output)
- Command injection (user input in shell commands)

**Authentication/Authorization:**
- Missing permission checks
- Insecure password handling
- Token validation issues
- Session management problems

**Data exposure:**
- Logging sensitive information
- Hardcoded secrets/passwords
- Exposing internal errors to users

### 6. Performance Issues

**Inefficient algorithms:**
- N+1 query problems
- Nested loops (O(n²) complexity)
- Unnecessary API calls
- Missing caching

**Memory leaks:**
- Event listeners not removed
- Circular references
- Large objects not freed
- Unclosed connections

### 7. Language-Specific Common Bugs

**JavaScript/TypeScript:**
- `==` vs `===` (use ===)
- `var` vs `let`/`const` (use let/const)
- `this` binding issues
- Async/await with forEach
- Floating point precision

**Python:**
- Mutable default arguments
- Indentation errors
- Integer division (/ vs //)
- Global variables in functions
- List/dict modifications during iteration

**Java:**
- NullPointerException
- Integer overflow
- Resource leaks (not closing streams)
- Concurrent modification exceptions
- String comparison with == instead of .equals()

**C/C++:**
- Memory leaks
- Buffer overflows
- Dangling pointers
- Use after free
- Uninitialized variables

## Bug Report Format

When you find a bug, report it clearly:

```
🐛 BUG FOUND: [Brief description]

📍 Location: [File and line number]

❌ Problem:
[Explain what's wrong]

💥 Impact:
[What happens because of this bug]

✅ Fix:
[How to fix it]

📝 Example:
[Show the corrected code]
```

## Debugging Process

1. **Reproduce the issue**
   - Understand what's supposed to happen
   - Understand what actually happens
   - Identify the steps to trigger the bug

2. **Isolate the problem**
   - Where does the error occur?
   - What code is involved?
   - What data is being processed?

3. **Identify the root cause**
   - What assumption is wrong?
   - What edge case wasn't handled?
   - What logic is flawed?

4. **Suggest a fix**
   - Show the corrected code
   - Explain why this fix works
   - Consider if the fix introduces new issues

5. **Prevent future bugs**
   - Add error handling
   - Add input validation
   - Add tests for this case
   - Add defensive programming

## Questions to Ask

When hunting bugs, ask:
- What happens if this variable is null/undefined/empty?
- What happens with invalid input?
- What happens at boundary conditions?
- Is there proper error handling?
- Are all resources properly cleaned up?
- Could this code be run concurrently?
- What are the assumptions in this code?
- Are those assumptions always true?

## Testing Suggestions

After finding bugs, suggest tests:
- Unit tests for the specific bug
- Integration tests for the workflow
- Edge case tests
- Error condition tests
