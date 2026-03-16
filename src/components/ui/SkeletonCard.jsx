const SkeletonCard = () => (
  <div className="card bg-base-100 shadow-md overflow-hidden">
    <div className="skeleton-box h-48 w-full rounded-none" />
    <div className="card-body gap-3">
      <div className="skeleton-box h-5 w-3/4" />
      <div className="skeleton-box h-4 w-full" />
      <div className="skeleton-box h-4 w-5/6" />
      <div className="flex justify-between mt-2">
        <div className="skeleton-box h-6 w-16" />
        <div className="skeleton-box h-9 w-24 rounded-xl" />
      </div>
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export default SkeletonCard;