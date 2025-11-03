---
name: testing-framework-helper
description: Generates comprehensive test suites with unit tests, integration tests, and E2E tests for various frameworks (Jest, Pytest, Vitest, etc.). Use when writing tests.
---

# Testing Framework Helper Skill

Expert at creating comprehensive test suites following testing best practices.

## When to Activate

- "write tests for [component/function]"
- "create test suite for [feature]"
- "generate unit/integration/E2E tests"

## Jest/Vitest (JavaScript/TypeScript)

```typescript
// UserService.test.ts
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { UserService } from './UserService';
import { mockDatabase } from '../test-utils/mockDatabase';

describe('UserService', () => {
  let userService: UserService;
  let db: ReturnType<typeof mockDatabase>;

  beforeEach(() => {
    db = mockDatabase();
    userService = new UserService(db);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getById', () => {
    it('should return user when found', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
      };

      db.user.findUnique.mockResolvedValue(mockUser);

      const result = await userService.getById(1);

      expect(result).toEqual(mockUser);
      expect(db.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null when user not found', async () => {
      db.user.findUnique.mockResolvedValue(null);

      const result = await userService.getById(999);

      expect(result).toBeNull();
    });

    it('should throw error on database failure', async () => {
      db.user.findUnique.mockRejectedValue(new Error('DB Error'));

      await expect(userService.getById(1)).rejects.toThrow('DB Error');
    });
  });

  describe('create', () => {
    it('should create user with valid data', async () => {
      const userData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'SecurePass123!',
      };

      const createdUser = {
        id: 2,
        ...userData,
        password: 'hashed_password',
      };

      db.user.create.mockResolvedValue(createdUser);

      const result = await userService.create(userData);

      expect(result).toEqual(createdUser);
      expect(db.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: userData.name,
          email: userData.email,
        }),
      });
    });

    it('should throw error when email exists', async () => {
      const userData = {
        name: 'John Doe',
        email: 'existing@example.com',
        password: 'pass123',
      };

      db.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(userService.create(userData)).rejects.toThrow(
        'Email already exists'
      );
    });
  });
});
```

## React Testing Library

```typescript
// UserList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserList } from './UserList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockUsers = [
  { id: 1, name: 'Alice', email: 'alice@test.com' },
  { id: 2, name: 'Bob', email: 'bob@test.com' },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('UserList', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('renders loading state initially', () => {
    (global.fetch as any).mockImplementation(() => new Promise(() => {}));

    render(<UserList />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders user list after loading', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  it('handles search functionality', async () => {
    render(<UserList />, { wrapper: createWrapper() });

    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Alice' } });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=Alice')
      );
    });
  });

  it('handles error state', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('API Error'));

    render(<UserList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

## Pytest (Python)

```python
# test_user_service.py
import pytest
from unittest.mock import Mock, patch, AsyncMock
from app.services.user_service import UserService
from app.models.user import User
from app.exceptions import ValidationError, NotFoundError

@pytest.fixture
def user_service():
    """Fixture for UserService instance"""
    return UserService()

@pytest.fixture
def mock_user():
    """Fixture for mock user data"""
    return User(
        id=1,
        email="test@example.com",
        name="Test User",
        role="user"
    )

class TestUserService:
    @pytest.mark.asyncio
    async def test_get_by_id_success(self, user_service, mock_user):
        """Test getting user by ID successfully"""
        with patch.object(User, 'get', return_value=mock_user) as mock_get:
            result = await user_service.get_by_id(1)

            assert result == mock_user
            mock_get.assert_called_once_with(id=1)

    @pytest.mark.asyncio
    async def test_get_by_id_not_found(self, user_service):
        """Test getting non-existent user"""
        with patch.object(User, 'get', return_value=None):
            with pytest.raises(NotFoundError, match="User not found"):
                await user_service.get_by_id(999)

    @pytest.mark.asyncio
    async def test_create_success(self, user_service):
        """Test creating user successfully"""
        user_data = {
            "email": "new@example.com",
            "name": "New User",
            "password": "SecurePass123!"
        }

        with patch.object(User, 'create', return_value=Mock(id=2)) as mock_create:
            result = await user_service.create(user_data)

            assert result.id == 2
            mock_create.assert_called_once()

    @pytest.mark.asyncio
    async def test_create_duplicate_email(self, user_service, mock_user):
        """Test creating user with existing email"""
        user_data = {
            "email": "existing@example.com",
            "name": "Test",
            "password": "pass123"
        }

        with patch.object(User, 'get_by_email', return_value=mock_user):
            with pytest.raises(ValidationError, match="Email already exists"):
                await user_service.create(user_data)

    @pytest.mark.parametrize("email,valid", [
        ("valid@example.com", True),
        ("invalid-email", False),
        ("", False),
        ("test@test", False),
    ])
    def test_validate_email(self, user_service, email, valid):
        """Test email validation with various inputs"""
        if valid:
            user_service.validate_email(email)
        else:
            with pytest.raises(ValidationError):
                user_service.validate_email(email)
```

## Integration Tests

```typescript
// user.integration.test.ts
import request from 'supertest';
import { app } from '../app';
import { setupTestDB, cleanupTestDB, seedTestData } from '../test-utils';

describe('User API Integration Tests', () => {
  let authToken: string;

  beforeAll(async () => {
    await setupTestDB();
    const seedData = await seedTestData();
    authToken = seedData.adminToken;
  });

  afterAll(async () => {
    await cleanupTestDB();
  });

  describe('GET /api/users', () => {
    it('should return paginated users', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${authToken}`)
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toHaveProperty('users');
      expect(response.body).toHaveProperty('meta');
      expect(Array.isArray(response.body.users)).toBe(true);
      expect(response.body.meta).toMatchObject({
        page: 1,
        limit: 10,
      });
    });

    it('should require authentication', async () => {
      await request(app)
        .get('/api/users')
        .expect(401);
    });
  });

  describe('POST /api/users', () => {
    it('should create new user with valid data', async () => {
      const userData = {
        name: 'New User',
        email: 'newuser@test.com',
        password: 'SecurePass123!',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body.data).toMatchObject({
        name: userData.name,
        email: userData.email,
      });
      expect(response.body.data).not.toHaveProperty('password');
    });

    it('should reject invalid email', async () => {
      const userData = {
        name: 'Test',
        email: 'invalid-email',
        password: 'pass123',
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });
});
```

## E2E Tests (Playwright/Cypress)

```typescript
// e2e/user-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[name="email"]', 'admin@test.com');
    await page.fill('[name="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display user list', async ({ page }) => {
    await page.goto('/users');

    await expect(page.locator('h1')).toContainText('Users');
    await expect(page.locator('[data-testid="user-row"]')).toHaveCount(10);
  });

  test('should create new user', async ({ page }) => {
    await page.goto('/users');
    await page.click('[data-testid="add-user-button"]');

    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');

    await page.click('[data-testid="submit-button"]');

    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page.locator('text=Test User')).toBeVisible();
  });

  test('should search users', async ({ page }) => {
    await page.goto('/users');

    await page.fill('[data-testid="search-input"]', 'Alice');
    await page.waitForLoadState('networkidle');

    const rows = page.locator('[data-testid="user-row"]');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Alice');
  });
});
```

## Best Practices

- Follow AAA pattern (Arrange, Act, Assert)
- Use descriptive test names
- Test edge cases and error conditions
- Mock external dependencies
- Use fixtures for test data
- Clean up after tests
- Test both happy and unhappy paths
- Use parameterized tests for similar cases
- Maintain test independence
- Keep tests fast
- Use proper assertion libraries
- Test accessibility
- Use test coverage tools
- Avoid test interdependence

## Output Checklist

- ✅ Test file created
- ✅ Setup/teardown configured
- ✅ Unit tests written
- ✅ Integration tests (if needed)
- ✅ E2E tests (if needed)
- ✅ Mocks/fixtures created
- ✅ Edge cases covered
- 📝 Test documentation
