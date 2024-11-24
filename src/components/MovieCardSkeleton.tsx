export const MovieCardSkeleton = () => {
    return (
        <div
            data-testid="movie-skeleton"
            className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">



            <div className="aspect-[2/3] bg-gray-200" />
            <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    );
};