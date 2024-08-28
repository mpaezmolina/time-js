'use client';

import { useState } from 'react';
import { saveLine } from '/app/dao'; // Adjust the import path as needed

export default function AddLineForm({ accessToken, onLineAdded }) {
    const [identifier, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await saveLine(identifier, accessToken);
        setName('');
        if (onLineAdded) onLineAdded();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <p>Create a new line</p>
                <label htmlFor="name"></label>
                <input className='text-black'
                    type="text"
                    id="name"
                    name="name"
                    value={identifier}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
