import Spinner from "@/components/ui/spinner";
import React from "react";

const LoadingPage: React.FC = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 flex justify-center items-center bg-white z-50">
      <div className="text-center text-gray-700">
        {/* Spinner */}
        <div className="animate-spin-slow flex items-center justify-center">
          <Spinner size="large" color="blue" />
        </div>

        {/* Text */}
        <p className="mt-4 text-lg font-semibold">Please wait, loading your content...</p>
        <p className="mt-2 text-sm font-medium text-gray-500">This might take a moment</p>
      </div>
    </div>
  );
};

export default LoadingPage;
