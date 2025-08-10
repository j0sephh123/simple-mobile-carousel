import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ThemedText } from '@/src/ui/primitives/ThemedText';

test('renders text', () => {
  render(<ThemedText>hello</ThemedText>);
  expect(screen.getByText('hello')).toBeTruthy();
});
