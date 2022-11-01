import { render } from '@testing-library/react';

import TodoUi from './todo-ui';

describe('TodoUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TodoUi />);
    expect(baseElement).toBeTruthy();
  });
});
