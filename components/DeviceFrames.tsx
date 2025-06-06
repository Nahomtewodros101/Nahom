"use client";

import { motion } from "framer-motion";
import type React from "react";

interface DeviceProps {
  children?: React.ReactNode;
  className?: string;
}

export function MacBookFrame({ children, className = "" }: DeviceProps) {
  return (
    <div className={`relative ${className}`}>
      {/* MacBook Frame */}
      <div className="relative w-full max-w-[900px] mx-auto">
        {/* Top lid with screen */}
        <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-lg shadow-2xl p-[12px] border-t border-l border-r border-gray-600">
          {/* Screen bezel */}
          <div className="relative w-full h-full bg-black rounded-t-lg overflow-hidden">
            {/* Camera */}
            <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="absolute w-1 h-1 bg-gray-600 rounded-lg"></div>
            </div>

            {/* Screen content */}
            <div className="absolute inset-0 overflow-hidden">{children}</div>
          </div>
        </div>

        {/* Bottom part (keyboard area) */}
        <div className="relative w-[102%] h-[20px] -left-[1%] bg-gradient-to-b from-gray-700 to-gray-800 rounded-b-lg shadow-xl">
          {/* Hinge */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gray-600"></div>

          {/* Trackpad */}
          <div className="absolute top-[6px] left-1/2 transform -translate-x-1/2 w-[30%] h-[8px] bg-gray-600/50 rounded-full"></div>
        </div>

        {/* Bottom edge shadow */}
        <div className="relative w-[104%] h-[4px] -left-[2%] bg-gray-900/50 rounded-b-full blur-sm"></div>
      </div>
    </div>
  );
}
