"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

interface ContactMapProps {
  hqTitle?: string;
  hqAddress?: string;
}

const HQ_COORDINATES: [number, number] = [-6.942660875897607, 107.78715326819288];

export default function ContactMap({
  hqTitle = "Ngarsa Digital HQ",
  hqAddress = "Jln. Letda Lukito No.16, Jatinangor, Sumedang - Indonesia",
}: ContactMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map: import("leaflet").Map | null = null;
    let isCancelled = false;

    // Dynamically import leaflet in browser context
    import("leaflet").then((L) => {
      if (isCancelled || !mapContainerRef.current) return;

      map = L.map(mapContainerRef.current, {
        center: HQ_COORDINATES,
        zoom: 16,
        scrollWheelZoom: false,
        attributionControl: true,
      });

      map.on("focus", () => {
        map?.scrollWheelZoom.enable();
      });
      map.on("blur", () => {
        map?.scrollWheelZoom.disable();
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Custom Neo-Brutalist Office Pin / Picker Icon
      const customOfficeIcon = L.divIcon({
        className: "custom-office-marker",
        html: `
          <div class="relative flex flex-col items-center cursor-pointer group" style="transform: translate(-50%, -100%); width: 48px; height: 62px;">
            <!-- Pin Badge -->
            <div class="w-12 h-12 bg-primary text-white border-3 border-outline-heavy shadow-[4px_4px_0px_0px_rgba(11,15,16,1)] flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-1">
              <span class="material-symbols-outlined text-2xl leading-none select-none" style="font-variation-settings: 'FILL' 1;">corporate_fare</span>
            </div>
            <!-- Triangle pointer pointing down -->
            <div class="w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-10px border-t-outline-heavy -mt-px"></div>
            <!-- Ground contact shadow -->
            <div class="w-3 h-1.5 bg-black/40 rounded-full blur-[0.5px] -mt-0.5"></div>
          </div>
        `,
        iconSize: [48, 62],
        iconAnchor: [24, 62],
        popupAnchor: [0, -62],
      });

      const marker = L.marker(HQ_COORDINATES, {
        icon: customOfficeIcon,
        title: hqTitle,
      }).addTo(map);

      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${HQ_COORDINATES[0]},${HQ_COORDINATES[1]}`;
      const popupHtml = `
        <div class="font-sans text-on-surface">
          <div class="flex items-center gap-2 mb-2 border-b-2 border-outline-heavy pb-1.5">
            <span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">corporate_fare</span>
            <h4 class="font-bold text-sm uppercase tracking-wide">${hqTitle}</h4>
          </div>
          <p class="text-xs text-on-surface-variant font-medium leading-relaxed mb-3">${hqAddress}</p>
          <a 
            href="${googleMapsUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1 text-xs font-bold bg-primary text-white px-3 py-1.5 border-2 border-outline-heavy shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all uppercase"
          >
            <span>Open in Maps</span>
            <span class="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        minWidth: 220,
        className: "neo-brutalist-popup",
      });

      setIsLoaded(true);

      setTimeout(() => {
        if (!isCancelled && map) {
          map.invalidateSize();
          marker.openPopup();
        }
      }, 300);
    });

    return () => {
      isCancelled = true;
      if (map) {
        map.remove();
      }
    };
  }, [hqTitle, hqAddress]);

  return (
    <div className="relative w-full h-full min-h-100">
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container gap-3 z-0 animate-pulse">
          <div className="w-12 h-12 bg-primary text-white border-3 border-outline-heavy shadow-[4px_4px_0px_0px_rgba(11,15,16,1)] flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: '"FILL" 1' }}>
              corporate_fare
            </span>
          </div>
          <p className="font-label-bold uppercase text-xs tracking-wider text-outline">
            Loading Map...
          </p>
        </div>
      )}
      <div ref={mapContainerRef} className="w-full h-full z-10" />
    </div>
  );
}
