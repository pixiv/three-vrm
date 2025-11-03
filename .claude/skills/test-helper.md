---
name: test-helper
description: Help write tests for code, explain testing concepts, and suggest test cases. Use when the user asks to "write tests", "help me test this", "what should I test", or needs testing guidance.
---

# Test Helper Skill

Comprehensive guidance for writing effective tests.

## Testing Philosophy

Tests should be:
- **Clear**: Easy to understand what's being tested
- **Isolated**: Each test is independent
- **Fast**: Quick to run
- **Reliable**: Same result every time
- **Comprehensive**: Cover important scenarios

## Test Structure (AAA Pattern)

Every test follows: **Arrange, Act, Assert**

```javascript
test('descriptive test name', () => {
  // ARRANGE: Set up test data and conditions
  const input = 'test data';
  const expected = 'expected result';

  // ACT: Execute the code being tested
  const actual = functionToTest(input);

  // ASSERT: Verify the result
  expect(actual).toBe(expected);
});
```

## What to Test

### 1. Happy Path (Normal Case)
Test that the code works with valid, expected inputs:
```javascript
test('adds two positive numbers correctly', () => {
  expect(add(2, 3)).toBe(5);
});
```

### 2. Edge Cases
Test boundary conditions:
```javascript
test('handles zero', () => {
  expect(add(0, 5)).toBe(5);
});

test('handles negative numbers', () => {
  expect(add(-2, 3)).toBe(1);
});

test('handles very large numbers', () => {
  expect(add(999999999, 1)).toBe(1000000000);
});
```

### 3. Error Cases
Test invalid inputs and error handling:
```javascript
test('throws error for non-numeric input', () => {
  expect(() => add('hello', 5)).toThrow();
});

test('handles null input', () => {
  expect(() => add(null, 5)).toThrow('Input cannot be null');
});
```

### 4. Empty/Null/Undefined
Test how code handles empty data:
```javascript
test('handles empty string', () => {
  expect(processString('')).toBe('');
});

test('handles empty array', () => {
  expect(processArray([])).toEqual([]);
});

test('handles undefined', () => {
  expect(processValue(undefined)).toBe(null);
});
```

## Test Coverage Checklist

For every function, test:
- ✅ Normal operation with valid inputs
- ✅ Empty inputs (empty string, empty array, null, undefined)
- ✅ Boundary values (min, max, zero, negative)
- ✅ Invalid inputs (wrong type, out of range)
- ✅ Error conditions
- ✅ Side effects (if any)
- ✅ Return values
- ✅ State changes (for stateful code)

## Common Testing Patterns

### Testing Functions

```javascript
describe('calculateTotal', () => {
  test('calculates sum of positive numbers', () => {
    expect(calculateTotal([1, 2, 3])).toBe(6);
  });

  test('returns 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  test('handles negative numbers', () => {
    expect(calculateTotal([-1, 2, -3])).toBe(-2);
  });

  test('throws error for non-array input', () => {
    expect(() => calculateTotal('not an array')).toThrow();
  });
});
```

### Testing Async Functions

```javascript
test('fetches user data', async () => {
  const userId = 123;
  const userData = await fetchUser(userId);

  expect(userData).toHaveProperty('id', userId);
  expect(userData).toHaveProperty('name');
});

test('handles fetch error', async () => {
  await expect(fetchUser(-1)).rejects.toThrow('User not found');
});
```

### Testing Classes

```javascript
describe('ShoppingCart', () => {
  let cart;

  beforeEach(() => {
    // Create fresh cart before each test
    cart = new ShoppingCart();
  });

  test('starts empty', () => {
    expect(cart.getItems()).toEqual([]);
    expect(cart.getTotal()).toBe(0);
  });

  test('adds items correctly', () => {
    cart.addItem({ name: 'Apple', price: 1.50 });
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getTotal()).toBe(1.50);
  });

  test('removes items correctly', () => {
    cart.addItem({ name: 'Apple', price: 1.50 });
    cart.removeItem(0);
    expect(cart.getItems()).toEqual([]);
  });
});
```

### Testing React Components (Example)

```javascript
test('renders button with correct text', () => {
  render(<Button label="Click me" />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} label="Click" />);

  fireEvent.click(screen.getByText('Click'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Mocking and Stubbing

When testing code that depends on external services:

```javascript
// Mock an API call
jest.mock('./api');
api.fetchData.mockResolvedValue({ data: 'test' });

test('processes API data', async () => {
  const result = await processApiData();
  expect(result).toBe('processed: test');
  expect(api.fetchData).toHaveBeenCalled();
});
```

## Test Organization

```
describe('User Authentication', () => {
  describe('login', () => {
    test('succeeds with valid credentials', () => { ... });
    test('fails with invalid password', () => { ... });
    test('fails with non-existent user', () => { ... });
  });

  describe('logout', () => {
    test('clears session', () => { ... });
    test('redirects to login page', () => { ... });
  });
});
```

## Good Test Names

Use descriptive names that explain what's being tested:

❌ Bad:
```javascript
test('test1', () => { ... });
test('it works', () => { ... });
```

✅ Good:
```javascript
test('returns empty array when input is null', () => { ... });
test('throws error when user is not authenticated', () => { ... });
test('calculates discount correctly for premium members', () => { ... });
```

## Testing Anti-Patterns (Avoid These!)

❌ **Testing implementation details**
```javascript
// Bad: Testing how it works, not what it does
test('uses a for loop to iterate', () => { ... });
```

❌ **Tests that depend on each other**
```javascript
// Bad: Test 2 depends on Test 1
test('test 1', () => { globalVar = 5; });
test('test 2', () => { expect(globalVar).toBe(5); }); // Fragile!
```

❌ **Tests that test the framework**
```javascript
// Bad: Testing that jest.fn() works
test('mock function works', () => {
  const mock = jest.fn();
  expect(typeof mock).toBe('function');
});
```

❌ **Overly complex tests**
```javascript
// Bad: Too much logic in the test
test('complex test', () => {
  for (let i = 0; i < 100; i++) {
    if (i % 2 === 0) {
      // ... complex logic
    }
  }
});
```

## Test-Driven Development (TDD)

1. **Write the test first** (it will fail)
2. **Write minimal code** to make it pass
3. **Refactor** the code
4. **Repeat**

```javascript
// Step 1: Write test (fails because function doesn't exist)
test('isPalindrome returns true for palindromes', () => {
  expect(isPalindrome('racecar')).toBe(true);
});

// Step 2: Write minimal code to pass
function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

// Step 3: Add more tests and refactor
```

## Testing Checklist for a Function

Before you're done testing a function, verify:
- [ ] Happy path test exists
- [ ] Edge cases are tested
- [ ] Error cases are tested
- [ ] All branches (if/else) are covered
- [ ] Boundary values are tested
- [ ] Null/undefined/empty inputs are handled
- [ ] Test names are descriptive
- [ ] Tests are independent
- [ ] Tests run quickly
- [ ] No duplicate test logic

## Common Testing Frameworks

**JavaScript/TypeScript:**
- Jest (most popular, all-in-one)
- Mocha + Chai
- Vitest (fast, modern)
- React Testing Library (for React)

**Python:**
- pytest (recommended)
- unittest (built-in)
- nose2

**Java:**
- JUnit
- TestNG
- Mockito (for mocking)

**Other:**
- Go: testing package
- Rust: built-in test framework
- Ruby: RSpec, Minitest

## Quick Tips

1. **Test behavior, not implementation**
2. **One assertion per test** (when possible)
3. **Keep tests simple and readable**
4. **Use descriptive test names**
5. **Don't test third-party code**
6. **Mock external dependencies**
7. **Run tests frequently**
8. **Aim for high coverage, but 100% isn't always necessary**
9. **Write tests for bugs you find** (regression tests)
10. **Tests are documentation** - they show how code should work

## When Helping Users Write Tests

1. **Identify what to test**: Look at the function and list test cases
2. **Suggest test structure**: Provide the describe/test organization
3. **Write example tests**: Show 2-3 complete examples
4. **Explain the tests**: Make sure user understands what each test does
5. **Check coverage**: Ensure important scenarios are covered
6. **Run the tests**: Verify they actually work
