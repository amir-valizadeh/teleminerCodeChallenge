import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from '../components/Pagination';

describe('Pagination Component', () => {
    const mockOnPageChange = vi.fn();

    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('renders correct number of page buttons', () => {
        render(
            <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
        );

        const pageButtons = screen.getAllByRole('button').filter(
            button => !['Previous', 'Next'].includes(button.textContent || '')
        );
        expect(pageButtons).toHaveLength(5);
    });

    it('disables Previous button on first page', () => {
        render(
            <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
        );

        const previousButton = screen.getByText('Previous');
        expect(previousButton).toBeDisabled();
    });

    it('disables Next button on last page', () => {
        render(
            <Pagination currentPage={10} totalPages={10} onPageChange={mockOnPageChange} />
        );

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();
    });

    it('calls onPageChange with correct page number', async () => {
        const user = userEvent.setup();
        render(
            <Pagination currentPage={1} totalPages={10} onPageChange={mockOnPageChange} />
        );

        const pageButton = screen.getByText('2');
        await user.click(pageButton);
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it('shows correct page range when in middle of pagination', () => {
        render(
            <Pagination currentPage={5} totalPages={10} onPageChange={mockOnPageChange} />
        );

        const pageNumbers = [3, 4, 5, 6, 7];
        pageNumbers.forEach(num => {
            expect(screen.getByText(num.toString())).toBeInTheDocument();
        });
    });

    it('highlights current page', () => {
        render(
            <Pagination currentPage={3} totalPages={10} onPageChange={mockOnPageChange} />
        );

        const currentPageButton = screen.getByText('3');
        expect(currentPageButton).toHaveClass('bg-blue-500', 'text-white');
    });
});