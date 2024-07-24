"use client";
import Loading from "@/components/reusable/loading";
import { handleGetAllWorkshops } from "@/services/worksops";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { useAppSelector } from "@/hooks/store";
import { divIcon } from "leaflet";
import Link from "next/link";


const DEFAULT_MALBOURNE_COORDINATES = {
  longitude: 144.9631,
  latitude: -37.8136,
};

const Workshop = () => {
  const [userLocation, setUserLocation] = useState(
    DEFAULT_MALBOURNE_COORDINATES
  );
  const { isAuthenticated, user, mechanic } = useAppSelector(
    (state) => state.auth
  );
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(true);
  const { isLoading, data } = useQuery({
    queryKey: ["workshops"],
    queryFn: () => handleGetAllWorkshops(),
  });

  useEffect(() => {
    (async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          });
          console.log("Coords: ", position.coords);
          setIsGettingCoordinates(false);
        },
        (err) => {
          toast.error("Please provide location permission!");
          setIsGettingCoordinates(false);
        },
        {
          enableHighAccuracy: true,
        }
      );
    })();
  }, []);

  useEffect(() => {
    // console.log("User location: ", userLocation);
  }, [userLocation]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center">
      <h2 className="text-2xl font-bold text-primary">Nearest Workshops</h2>
      {isLoading || isGettingCoordinates ? (
        <Loading className="h-screen" />
      ) : (
        <MapContainer
          style={{
            height: "80vh",
            width: "95%",
            margin: "auto",
            maxHeight: "1000px",
            maxWidth: "1800px",
          }}
          center={[userLocation.latitude, userLocation.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            icon={divIcon({
              html: `<div class="flex items-center justify-center gap-2 text-primary">
                <img src="https://www.svgrepo.com/show/312483/location-indicator-red.svg" class="w-12 h-12" />
              </div>`,
            })}
            position={[userLocation.latitude, userLocation.longitude]}
          >
            <Popup>
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <h2 className="text-base font-bold text-primary">
                  Your Location
                </h2>
                <div className="flex gap-2 items-center justify-center text-xs">
                  {/* x and y */}
                  <span>Lat: {userLocation.latitude}</span>
                  <span>Long: {userLocation.longitude}</span>
                </div>
              </div>
            </Popup>
          </Marker>

          {/* workshops */}
          {data?.map((w,index) => (
            <Marker key={index}
              icon={divIcon({
                html: `<div class="flex items-center justify-center gap-2 text-primary w-12 h-12 rounded-full p-0.5">
                <img src="https://www.svgrepo.com/show/397432/mechanic-medium-light-skin-tone.svg" class="w-full h-full object-contain object-center " />
              </div>`,
              })}
              position={[
                Number(w.storeCoordinates.latitude),
                Number(w.storeCoordinates.longitude),
              ]}
            >
              <Popup>
                <div className="flex flex-col items-center justify-center gap-2 text-center">
                  <h2 className="text-base font-bold text-primary">
                    {w.storeName}
                  </h2>
                  <div className="flex gap-0.5 flex-col items-center justify-center text-xs">
                    <span>Address: {w.storeAddress}</span>
                    <span>Phone: {w.phone}</span>
                    <span>Email: {w.email}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};
export default Workshop;