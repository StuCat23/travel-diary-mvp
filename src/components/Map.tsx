'use client'

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Pin {
    id: string;
    name: string;
    lat: number;
    lng: number;
}

interface MapProps {
    pins: Pin[];
    onPinAdd: (lat: number, lng: number) => void;
}

function LocationMarker({ onPinAdd }: { onPinAdd: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onPinAdd(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function Map({ pins, onPinAdd }: MapProps) {
    const [center, setCenter] = useState<[number, number]>([51.505, -0.09]); // Default to London

    return (
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%'}}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
            />
            <LocationMarker onPinAdd={onPinAdd} />
            {pins.map((pin) => (
                <Marker key={pin.id} position={[pin.lat, pin.lng]}>
                    <Popup>{pin.name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}