export default function Loading() {
  return (
    <main className="min-h-screen bg-background text-foreground bg-mesh">
      {/* Navbar skeleton */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between">
          <div className="h-8 w-28 rounded-lg skeleton" />
          <div className="hidden md:flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-16 rounded skeleton" />
            ))}
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 rounded-lg skeleton" />
            <div className="h-8 w-8 rounded-lg skeleton" />
          </div>
        </div>
      </nav>

      {/* Hero skeleton */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 rounded-2xl skeleton" />
              <div className="space-y-2">
                <div className="h-8 w-48 rounded skeleton" />
                <div className="h-4 w-32 rounded skeleton" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-72 rounded skeleton" />
              <div className="h-5 w-56 rounded skeleton" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-32 rounded-xl skeleton" />
              <div className="h-10 w-10 rounded-xl skeleton" />
              <div className="h-10 w-10 rounded-xl skeleton" />
            </div>
          </div>
          <div className="h-64 rounded-2xl skeleton" />
        </div>
      </section>

      {/* Section skeletons */}
      {[1, 2, 3].map((i) => (
        <section key={i} className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 space-y-2">
              <div className="h-7 w-48 mx-auto rounded skeleton" />
              <div className="h-4 w-72 mx-auto rounded skeleton" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-48 rounded-2xl skeleton" />
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
