import React from 'react';

import type { userFolder } from '../../services/requests';

import { Button } from './ui/button';
import FolderPopup from './ui/FolderPopup';

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
    <div className="container p-4">
      {openCardId && (
        <FolderPopup
          openCard={openCard}
          setOpenCardId={setOpenCardId}
        />
      )}

      <div className="p-4">Toolbar</div>

      {/* Bookshelf structure */}
      <div className="relative">
        {/* Top wooden panel */}
        <div className="h-6 bg-amber-800 rounded-t-lg shadow-inner relative overflow-hidden">
          {/* Wood grain effect */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900"></div>
          {/* Top edge highlight */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600 opacity-40"></div>
        </div>

        {/* Main grid with wooden texture background */}
        <div
          className="p-4 bg-amber-950 rounded-lg shadow-inner relative"
          style={{
            backgroundImage: "url('/bg-shelf.jpeg')",
            backgroundBlendMode: 'multiply',
            backgroundSize: 'fill',
          }}
        >
          {/* Wood grain overlay */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-elegant-gold to-amber-950 rounded-lg"></div>

          {/* The actual grid */}
          <div className="grid grid-cols-4 gap-4 relative z-10 p-2 place-items-center">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className={`p-4 my-2 w-2/3 rounded-lg cursor-pointer transition-all transform ${
                  openCardId === folder.id
                    ? 'bg-golden-text scale-105'
                    : 'bg-amber-100 hover:bg-amber-200 hover:scale-105'
                } relative`}
                onClick={() => toggleCard(folder.id)}
                style={{
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)',
                }}
              >
                {/* Depth effect for the shelf */}
                <div
                  className="absolute inset-0 bg-amber-950 rounded-lg -z-10 transform translate-y-1"
                  style={{ filter: 'blur(1px)' }}
                ></div>

                {/* Folder content */}
                <div className="flex flex-col items-center">
                  {/* Folder icon */}
                  <div className="w-16 h-16 mb-2 relative mt-2">
                    <img
                      src="/logo192.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-center text-exlight-gold">
                    {folder.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wooden panel */}
        <div className="h-8 bg-amber-800 rounded-b-lg shadow-lg relative overflow-hidden">
          {/* Wood grain effect */}
          <div className="absolute inset-0 opacity-30 bg-gradient-to-r from-amber-900 via-amber-700 to-amber-900"></div>
          {/* Bottom edge shadow */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-amber-950 opacity-30"></div>
        </div>

        {/* Side panels */}
        <div className="absolute top-6 bottom-8 left-0 w-4 bg-amber-800"></div>
        <div className="absolute top-6 bottom-8 right-0 w-4 bg-amber-800"></div>
      </div>
    </div>
  );
}
