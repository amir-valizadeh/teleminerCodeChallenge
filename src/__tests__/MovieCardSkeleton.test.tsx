import { render } from '../test-utils';
import { describe, it, expect } from 'vitest';
import { MovieCardSkeleton } from '../components/MovieCardSkeleton';

describe('MovieCardSkeleton Component', () => {
    it('renders skeleton elements', () => {
        const { container } = render(<MovieCardSkeleton />);

        expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
        expect(container.querySelector('.aspect-[2/3]')).toBeInTheDocument();
        expect(container.querySelectorAll('.bg-gray-200')).toHaveLength(4);
    });

    it('has correct test id', () => {
        const { getByTestId } = render(<MovieCardSkeleton />);
        expect(getByTestId('movie-skeleton')).toBeInTheDocument();
    });

    it('maintains aspect ratio', () => {
        const { container } = render(<MovieCardSkeleton />);
        const aspectRatioDiv = container.querySelector(`.aspect-*`);
        expect(aspectRatioDiv).toBeInTheDocument();
    });

    it('applies correct styles to placeholder elements', () => {
        const { container } = render(<MovieCardSkeleton />);
        const placeholders = container.querySelectorAll('.bg-gray-200');

        placeholders.forEach(placeholder => {
            expect(placeholder).toHaveClass('bg-gray-200');
        });
    });
});