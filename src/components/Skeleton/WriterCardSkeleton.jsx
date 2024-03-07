"use client";

export default function WriterCardSkeleton() {
  return (
    <div className="space-y-2">
      <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto animate-pulse"></div>
      <div className="max-w-36 h-4 mx-auto bg-gray-100 rounded-xl animate-pulse"></div>
    </div>
  );
}
