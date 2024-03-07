"use client";
import React from "react";

export default function BookCardSkeleton() {
  return (
    <div className="space-y-2">
      <div className="w-36 h-44 bg-gray-200 animate-pulse"></div>
      <div className="max-w-36 h-2 bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="max-w-24 h-2 bg-gray-200 rounded-xl animate-pulse"></div>
      <div className="max-w-36 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  );
}
