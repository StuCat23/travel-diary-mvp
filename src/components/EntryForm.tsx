'use client'

import { useState } from 'react';

interface Entry {
    id: string;
    pinId: string;
    note: string;
    date: string;
    rating: number;
}

interface EntryFormProps {
    pinId: string;
    onSave: (entry: Entry) => void;
    onCancel: () => void;
}

export default function EntryForm({ pinId, onSave, onCancel }: EntryFormProps) {
    const [note, setNote] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [rating, setRating] = useState(1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const entry: Entry = {
            id: Date.now().toString(),
            pinId,
            note,
            date,
            rating,
        };
        onSave(entry);
    };

    return (
        <form onSubmit={handleSubmit} className='p-4 border rounded mb-4'>
            <h3 className='text-lg font-bold mb-2'>Add Diary Entry</h3>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder='Write your note...'
                className='w-ful p-2 border rounded mb-2'
                required
            />
            <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className='w-full p-2 border rounded mb-2'
            />
            <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className='w-full p-2 border rounded mb-2'
            >
                {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                ))}
            </select>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded mr-2'>Save</button>
            <button type='button' onClick={onCancel} className='bg-gray-500 text-white px-4 py-2 rounded'>Cancel</button>
        </form>
    );
}