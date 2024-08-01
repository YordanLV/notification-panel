export default function LoadingSkeleton() {
  // Function to generate a random height class
  const randomHeight = () => {
    const heights = ["h-4", "h-5", "h-6", "h-7", "h-8"];
    return heights[Math.floor(Math.random() * heights.length)];
  };

  return (
    <div className="border border-gray-700 p-4 rounded-lg bg-gray-900 shadow-lg animate-pulse">
      <div className={`${randomHeight()} bg-gray-700 rounded w-1/4 mb-2`}></div>
      <div className={`${randomHeight()} bg-gray-700 rounded w-3/4 mb-2`}></div>
      <div className={`${randomHeight()} bg-gray-700 rounded w-1/2`}></div>
    </div>
  );
}
