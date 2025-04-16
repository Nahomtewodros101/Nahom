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

const position: [number, number] = [8.994517, 38.826705];

const MapComponent = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const proto = L.Icon.Default.prototype as unknown as {
      _getIconUrl?: () => string;
    };
    if (proto._getIconUrl) {
      delete proto._getIconUrl;
    }

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });
  }, []);

  if (!isMounted) {
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

      <div className="h-[300px] w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          className="z-10"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup className="custom-popup">
              <div className="text-center py-1">
                <h4 className="font-bold text-base">Nahoms Office</h4>
                <p className="text-sm">Available for meetings</p>
                <p className="text-xs text-gray-500 mt-1">
                  8.994517, 38.826705
                </p>
              </div>
            </Popup>
          </Marker>
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
