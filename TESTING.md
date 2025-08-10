# Testing Guide

This project uses Jest and React Testing Library for testing React Native components and hooks.

## Quick Start

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests for CI
```bash
npm run test:ci
```

### Using the Test Runner Script
```bash
# Run all tests
./scripts/test.sh

# Run tests in watch mode
./scripts/test.sh watch

# Run tests with coverage
./scripts/test.sh coverage

# Run specific tests
./scripts/test.sh specific QueryState

# Run linting and tests
./scripts/test.sh all

# Show help
./scripts/test.sh help
```

## Test File Structure

Tests should be placed alongside the components they test with the following naming convention:
- `ComponentName.test.tsx` for component tests
- `ComponentName.spec.tsx` for component tests (alternative)
- `hookName.test.ts` for hook tests
- `hookName.spec.ts` for hook tests (alternative)

## Writing Tests

### Component Tests

```tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  it('handles props correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeTruthy();
  });
});
```

### Hook Tests

```tsx
import { renderHook, act } from '@testing-library/react-native';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });

  it('updates state correctly', () => {
    const { result } = renderHook(() => useMyHook());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.value).toBe(1);
  });
});
```

### Testing Async Operations

```tsx
import { waitFor } from '@testing-library/react-native';

it('handles async operations', async () => {
  render(<AsyncComponent />);
  
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeTruthy();
  });
});
```

## Testing Utilities

### Screen Queries

- `getByText()` - Find element by text content
- `getByTestId()` - Find element by testID
- `getByRole()` - Find element by accessibility role
- `queryByText()` - Find element (returns null if not found)
- `findByText()` - Find element asynchronously

### User Interactions

```tsx
import { fireEvent } from '@testing-library/react-native';

it('handles user input', () => {
  render(<InputComponent />);
  
  const input = screen.getByTestId('input');
  fireEvent.changeText(input, 'new text');
  
  expect(input.props.value).toBe('new text');
});
```

### Mocking

The project includes comprehensive mocks for:
- Expo modules (router, constants, font, haptics, etc.)
- React Native modules (reanimated, gesture handler, etc.)
- Third-party libraries (@tanstack/react-query)

## Test Coverage

Coverage reports are generated when running `npm run test:coverage` and include:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Coverage reports are saved to the `coverage/` directory.

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
3. **Test Edge Cases**: Include tests for error states, empty states, and boundary conditions
4. **Keep Tests Simple**: Each test should test one specific thing
5. **Use Test IDs**: Add `testID` props to elements that are hard to query otherwise
6. **Mock External Dependencies**: Mock API calls, navigation, and other external services
7. **Test Accessibility**: Ensure components are accessible by testing with screen readers

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all dependencies are properly mocked in `jest.setup.js`
2. **TypeScript Errors**: Check that `tsconfig.test.json` is properly configured
3. **Component Not Rendering**: Verify that all required providers are mocked
4. **Async Test Failures**: Use `waitFor` or `findBy` for asynchronous operations

### Debug Mode

Run tests with verbose output:
```bash
npm test -- --verbose
```

### Running Single Tests

```bash
# Run specific test file
npx jest ComponentName.test.tsx

# Run specific test
npx jest -t "test description"

# Run tests matching pattern
npx jest --testNamePattern="pattern"
```

## Configuration Files

- `jest.config.js` - Jest configuration
- `jest.setup.js` - Test environment setup and mocks
- `tsconfig.test.json` - TypeScript configuration for tests
- `scripts/test.sh` - Test runner script

## Continuous Integration

The `npm run test:ci` command is designed for CI environments and:
- Runs tests without watch mode
- Generates coverage reports
- Exits with appropriate error codes
- Optimizes for CI performance
