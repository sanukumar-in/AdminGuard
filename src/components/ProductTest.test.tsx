import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from './ProductCard';

vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
}));

describe('ProductCard Component', () => {
    const mockProps = {
        id: 1,
        title: 'Fjallraven Backpack',
        price: 109.95,
        image: 'backpack.jpg',
        category: "men's clothing"
    };

    it('renders the title, price, and category', () => {
        render(<ProductCard {...mockProps} />);

        expect(screen.getByText('Fjallraven Backpack')).toBeInTheDocument();
        expect(screen.getByText('$109.95')).toBeInTheDocument();
        expect(screen.getByText("men's clothing")).toBeInTheDocument();
    });
});