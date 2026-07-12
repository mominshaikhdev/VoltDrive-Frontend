
export default function SkeletonLoader() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse flex flex-col h-[400px]">
      <div className="h-48 bg-gray-800/80 w-full" />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-800 w-16 rounded-md" />
            <div className="h-4 bg-gray-800 w-10 rounded-md" />
          </div>
          <div className="h-6 bg-gray-800 w-3/4 rounded-md" />
          <div className="h-4 bg-gray-800 w-full rounded-md" />
          <div className="h-4 bg-gray-800 w-5/6 rounded-md" />
        </div>
        <div className="space-y-3 pt-4 border-t border-gray-800/60">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-800 w-20 rounded-md" />
            <div className="h-3 bg-gray-800 w-16 rounded-md" />
          </div>
          <div className="h-10 bg-gray-800 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
