'use client'

import { useState } from 'react';
import Map from '../components/Map';
import EntryForm from '../components/EntryForm';

interface Entry {
  id: string;
  pinId: string;
  note: string;
  date: string;
  rating: number;
}

interface Pin {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export default function Home() {
  const [ pins, setPins ] = useState<Pin[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [selectedPinId, setSelectedPinId] = useState<string | null>(null);

  const handlePinAdd = (lat: number, lng: number) => {
    const newPin: Pin = {
      id: Date.now().toString(), // Temp Id; replace with Supabase insert later
      name: `Pin at ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
      lat,
      lng,
    };
    setPins([...pins, newPin]);
  };

  const handlePinClick = (pinId: string) => {
    setSelectedPinId(pinId);
  };

  const handleEntrySave = (entry: Entry) => {
    setEntries([...entries, entry]);
    setSelectedPinId(null);
  };

  const handleEntryCancel = () => {
    setSelectedPinId(null);
  };

  return (
    <div className='min-h-screen'>
      <h1 className='text-2xl font-bold mb-4'>Travel Diary MVP</h1>
      <div className='w-full h-96 mb-4'>
        <Map pins={pins} onPinAdd={handlePinAdd} onPinClick={handlePinClick} />
      </div>
      {selectedPinId && (
        <EntryForm pinId={selectedPinId} onSave={handleEntrySave} onCancel={handleEntryCancel} />
      )}
      <ul className='mt-4'>
          {entries.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.date} - {entry.rating} stars:</strong> {entry.note}
          </li>
        ))}
      </ul>
    </div>
  );
}