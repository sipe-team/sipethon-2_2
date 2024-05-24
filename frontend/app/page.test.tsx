import { render } from '@testing-library/react';

import HomePage from './page';

describe('HomePage', () => {
  const renderHomePage = () => render((
    <HomePage />
  ));

  it('Should be visible "껄무새"', () => {
    const { container } = renderHomePage();

    expect(container).toHaveTextContent('껄무새');
  });
});
