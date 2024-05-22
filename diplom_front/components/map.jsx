"use client";
import React, { useRef, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const LocationMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 13.338414, lat: 52.507932 };
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
    });
    const customIcon = L.icon({
      iconUrl: "/images/location-pin.png",
      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-1, -65],
    });
    const userCurrent = L.icon({
      iconUrl: "/images/user_current_location.png",
      iconSize: [38, 38],
      iconAnchor: [22, 94],
      popupAnchor: [-1, -65],
    });
    const mtLayer = new MaptilerLayer({
      apiKey: "dBZ9cM07lBIz12xOogkU",
    }).addTo(map.current);

    map.current.locate({ setView: true, maxZoom: 16 });

    const markers = [
      [47.9035392, 106.9154304, "Салбар 1"],
      [47.9135381, 106.9254304, "Салбар 2"],
    ];
    markers.map((marker) => {
      L.marker([marker[0], marker[1]], { icon: customIcon })
        .addTo(map.current)
        .bindPopup(marker[2])
        .openPopup();
    });
    map.current.on("locationfound", function (e) {
      console.log(e);
      L.marker(e.latlng, { icon: userCurrent }).addTo(map.current).openPopup();
    });
    map.current.on("locationerror", function (e) {
      alert(e.message);
    });
  }, [zoom]);

  return (
    <div className="w-full h-screen absolute left-0 top-20">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default LocationMap;
