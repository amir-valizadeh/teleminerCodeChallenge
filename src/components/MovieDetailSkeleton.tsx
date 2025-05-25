export const MovieDetailSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Poster skeleton */}
                <div className="aspect-[2/3] bg-gray-200 rounded-lg"></div>

                {/* Content skeleton */}
                <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                    <div className="space-y-2">
                        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </div>
            </div>

            {/* Cast skeleton */}
            <div className="mt-12">
                <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({length: 6}).map((_, i) => (
                        <div key={i} className="text-center">
                            <div className="aspect-square bg-gray-200 rounded-lg mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded mb-1"></div>
                            <div className="h-3 bg-gray-200 rounded w-3/4 mx-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}