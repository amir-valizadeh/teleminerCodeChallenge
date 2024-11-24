import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fetchMovies } from '../services/api';

describe('API Service', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        // Reset fetch mock
        global.fetch = vi.fn();
    });

    it('fetches movies successfully', async () => {
        const mockResponse = {
            page: 1,
            results: [],
            total_pages: 10,
            total_results: 100
        };

        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse
        });

        const result = await fetchMovies(1);
        expect(result).toEqual(mockResponse);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('handles API errors', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        await expect(fetchMovies(1)).rejects.toThrow('Failed to fetch movies');
    });

    it('includes correct headers in request', async () => {
        global.fetch = vi.fn().mockResolvedValueOnce({
            ok: true,
            json: async () => ({})
        });

        await fetchMovies(1);

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                headers: expect.objectContaining({
                    accept: 'application/json',
                    Authorization: expect.any(String)
                })
            })
        );
    });

    it('handles network errors', async () => {
        global.fetch = vi.fn().mockRejectedValueOnce(new Error('Network error'));

        await expect(fetchMovies(1)).rejects.toThrow('Failed to fetch movies');
    });
});