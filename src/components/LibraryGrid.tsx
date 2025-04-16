import React from 'react';

import { useMutation } from '@tanstack/react-query';

import type {
  paginatedFolderData,
  userFolder,
} from '../services/requests';

import { FolderPlus } from 'lucide-react';
import { Link as LinkIcon } from 'lucide-react';

import { Button } from './ui/button';
import FolderPopup from './FolderPopup';
import { FolderPopover } from './FolderForm';

import { Link } from '@tanstack/react-router';

import { createNewFolder } from '../services/requests';

type LibraryGridProps = {
  apiData: paginatedFolderData;
  pageId: number;
  setPageId: React.Dispatch<React.SetStateAction<number>>;
};

export default function LibraryGrid({
  apiData,
  pageId,
  setPageId,
}: LibraryGridProps) {
  const [openCardId, setOpenCardId] = React.useState<number | null>(
    null
  );

  console.log(apiData);

  const folders = apiData.results;

  const { mutate } = useMutation({
    mutationFn: createNewFolder,
    onSuccess: () => {
      console.log('success');
    },
  });

  function handleFolderCreate(folderName: string) {
    mutate(folderName);
  }

  const toggleCard = (id: number | null) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  const openCard: userFolder = folders.find(
    (card) => card.id === openCardId
  );

  return (
    <div className="container p-4 flex flex-col gap-8">
      {openCardId && (
        <FolderPopup
          openCard={openCard}
          setOpenCardId={setOpenCardId}
        />
      )}

      <div className="w-1/2 self-center bg-gradient-to-br from-gray-200/40 via-gray-300/30 to-gray-500/20 backdrop-blur-md shadow-md border border-gray-300 rounded-xl">
        <div className="px-4 py-2 flex gap-16 items-center">
          <FolderPopover onFolderCreate={handleFolderCreate} />
          <Button
            variant="ghost"
            className="p-0 hover:bg-transparent focus-visible:ring-0"
            asChild
          >
            <LinkIcon size={23} />
          </Button>
        </div>
      </div>

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
