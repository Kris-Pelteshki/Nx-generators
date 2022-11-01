import { render } from '@testing-library/react';

import CreateTodo from './create-todo';

describe('CreateTodo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateTodo />);
    expect(baseElement).toBeTruthy();
  });
});
