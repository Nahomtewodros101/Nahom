"use client";
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define position as a tuple with exactly 2 elements (latitude, longitude)
const position: [number, number] = [8.994517, 38.826705];

const MapComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Fix Leaflet icon issues that commonly occur in Next.js
  useEffect(() => {
    setIsMounted(true);

    // Fix the icon issue
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    // Set up the new icon paths
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  if (!isMounted) {
    // Return a placeholder with the same dimensions until the map loads
    return (
      <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">My Location</h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Addis Ababa, Ethiopia
        </span>
      </div>

      {/* Container with fixed height to make map smaller */}
      <div className="h-[300px] w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
          zoomControl={false} // We'll add zoom control in a better position
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup className="custom-popup">
              <div className="text-center py-1">
                <h4 className="font-bold text-base">Nahom's Office</h4>
                <p className="text-sm">Available for meetings</p>
                <p className="text-xs text-gray-500 mt-1">
                  8.994517, 38.826705
                </p>
              </div>
            </Popup>
          </Marker>
          {/* Add zoom control to the bottom right instead of top left */}
          <ZoomControl position="bottomright" />
        </MapContainer>
      </div>

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>Tap marker for details</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${position[0]},${position[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default MapComponent;
