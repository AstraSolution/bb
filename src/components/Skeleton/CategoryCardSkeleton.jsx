"use client";

import React from "react";
import './CategoryCardSkeleton.css'

const CategoryCardSkeleton = () => {
  return (
    <div className="animate-pulse my-10">
      <div className="skeleton-header animate-pulse w-20 h-20 lg:h-32 lg:w-32 bg-gray-200 mb-2 rounded-lg"></div>
      <div className="skeleton-body animate-pulse h-2 w-20 lg:w-32 rounded-lg bg-gray-300 mt-2"></div>
    </div>
  );
};

export default CategoryCardSkeleton;
