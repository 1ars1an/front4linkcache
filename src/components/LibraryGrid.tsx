import React from 'react';
import type { userFolder } from '../../services/requests';
import { Button } from './ui/button';
import { Link } from '@tanstack/react-router';

type Props = {
  folders: userFolder[];
};

export default function LibraryGrid({ folders }: Props) {
  const [openCardId, setOpenCardId] = React.useState<number | null>(
    null
  );

  console.log(folders);

  const toggleCard = (id: number | null) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  const openCard: userFolder = folders.find(
    (card) => card.id === openCardId
  );

  return (
    <div className="container mx-auto p-4">
      {openCardId && (
        <div className="w-full mb-6 p-6 bg-blue-100 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{openCard.name}</h2>
            <div className="flex gap-2">
              <Button asChild>
                <Link to={'/app/' + openCard.id}>folder</Link>
              </Button>
              <Button onClick={() => setOpenCardId(null)}>
                Close
              </Button>
            </div>
          </div>
          <div className="text-gray-700">
            <p>{'hello'}</p>
            <p className="mt-4">
              This is the expanded content area that would contain
              your "next page" in the SPA. It pushes the grid down
              when opened.
            </p>
          </div>
        </div>
      )}

      {/* Grid layout with 5 columns */}
      <div className="grid grid-cols-5 gap-4">
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              openCardId === folder.id
                ? 'bg-blue-200 shadow-lg'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
            onClick={() => toggleCard(folder.id)}
          >
            <h3 className="font-medium">{folder.name}</h3>
            <p className="text-sm text-gray-600">Click to expand</p>
          </div>
        ))}
      </div>
    </div>
  );
}
