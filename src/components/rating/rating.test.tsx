import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Rating } from './index';

describe('Rating', () => {
  it('renders rating value correctly', () => {
    render(<Rating rating={8.5} quantity={100} />);
    
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('renders quantity of reviews correctly', () => {
    render(<Rating rating={7.2} quantity={250} />);
    
    expect(screen.getByText('250 avaliações')).toBeInTheDocument();
  });

  it('formats rating to one decimal place', () => {
    render(<Rating rating={9.123} quantity={50} />);
    
    expect(screen.getByText('9.1')).toBeInTheDocument();
  });

  it('displays star icon', () => {
    const { container } = render(<Rating rating={8.0} quantity={75} />);
    
    const starIcon = container.querySelector('svg');
    expect(starIcon).toBeInTheDocument();
  });
});

