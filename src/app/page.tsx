'use client'

import { useState } from 'react';
import Map from '../components/Map';

interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export default function Home() {
  const [ pins, setPins ] = useState<Pin[]>([]);

  const handlePinAdd = (lat: number, lng: number) => {
    const newPin: Pin = {
      id: Date.now().toString(), // Temp Id; replace with Supabase insert later
      name: `Pin at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      lat,
      lng,
    };
    setPins([...pins, newPin]);
  };

  return (
    <div className='min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Travel Diary MVP</h1>
      <div className='w-full h-96 mb-4'>
        <Map pins={pins} onPinAdd={handlePinAdd} />
      </div>
      <ul className='mt-4'>
        {pins.map((pin) =>(
          <li key={pin.id}>{pin.name}</li>
        ))}
      </ul>
    </div>
  );
}