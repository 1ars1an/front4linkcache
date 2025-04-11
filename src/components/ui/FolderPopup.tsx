import React from 'react';

import { Button } from './button';
import { Link } from '@tanstack/react-router';

export default function FolderPopup({ openCard, setOpenCardId }) {
  return (
    <div className="w-full mb-6 p-6 bg-blue-100 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{openCard.name}</h2>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/app/${openCard.id}`}>folder</Link>
          </Button>
          <Button onClick={() => setOpenCardId(null)}>Close</Button>
        </div>
      </div>
      <div className="text-gray-700">
        <p>{'hello'}</p>
        <p className="mt-4">
          This is the expanded content area that would contain your
          "next page" in the SPA. It pushes the grid down when opened.
        </p>
      </div>
    </div>
  );
}
