"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { toast } from "sonner";
import { divIcon } from "leaflet";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSetCoordinates: (coordinates: {
    longitude: number;
    latitude: number;
  }) => void;
};
const DEFAULT_MALBOURNE_COORDINATES = {
  longitude: 144.9631,
  latitude: -37.8136,
};
const GetCoordinates = ({ isOpen, onOpenChange, onSetCoordinates }: Props) => {
  const [userLocation, setUserLocation] = useState(
    DEFAULT_MALBOURNE_COORDINATES
  );

  const [isGettingCoordinates, setIsGettingCoordinates] = useState(true);

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
          console.log (err);
        },
        {
          enableHighAccuracy: true,
        }
      );
    })();
  }, []);
  

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        <div className="w-full h-full">
          <MapContainer
            style={{
              height: "70vh",
              width: "100%",
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
              draggable={true}
              position={[userLocation.latitude, userLocation.longitude]}
              eventHandlers={{
                dragend: (e) => {
                  const marker = e.target;
                  const position = marker.getLatLng();
                  onSetCoordinates({
                    longitude: position.lng,
                    latitude: position.lat,
                  });
                },
              }}
            ></Marker>
          </MapContainer>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onOpenChange(false);
            }}
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GetCoordinates;
