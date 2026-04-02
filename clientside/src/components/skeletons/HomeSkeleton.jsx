const HomeSkeleton = () => {
  return (
    <div className="space-y-16">
      {/* BrandIntroduction Skeleton */}
      <section className="space-y-6 px-4 py-10">
        <div className="skeleton h-10 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
        <div className="skeleton h-12 w-40 mt-4" />
      </section>

      {/* Products Skeleton */}
      <section className="px-4 space-y-6">
        <div className="skeleton h-8 w-48" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="skeleton h-48 w-full rounded-lg" />
              <div className="skeleton h-4 w-3/4" />
              <div className="skeleton h-4 w-1/2" />
              <div className="skeleton h-10 w-full" />
            </div>
          ))}
        </div>
      </section>

      {/* Top Doctors Skeleton */}
      <section className="px-4 space-y-6">
        <div className="skeleton h-8 w-56" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="skeleton h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-2/3" />
                <div className="skeleton h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carousel Skeleton */}
      <section className="px-4">
        <div className="skeleton h-64 w-full rounded-xl" />
      </section>

      {/* Banner Skeleton */}
      <section className="px-4 pb-10">
        <div className="skeleton h-40 w-full rounded-xl" />
      </section>
    </div>
  )
}

export default HomeSkeleton
