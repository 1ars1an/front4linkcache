import React from 'react';

import { Button } from './ui/button';

import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { getTopUserLinks } from '../services/requests';

export default function FolderPopup({ openCard, setOpenCardId }) {
  const { data, isPending } = useQuery({
    queryKey: ['topLinks', `${openCard.id}`],
    queryFn: () => getTopUserLinks(openCard.id),
  });

  console.log(data);

  return isPending ? (
    <div className="w-full mb-6 relative overflow-hidden">
      <div className="relative">
        <div className="h-12 bg-green-700 rounded-t-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-800 opacity-50"></div>
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-green-500 opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-green-800 to-brown-700 opacity-70"></div>
        </div>
        <div className="py-8 relative bg-amber-950 rounded-b-lg shadow-inner min-h-64 flex flex-col justify-center"></div>
      </div>
    </div>
  ) : (
    <>
      <div className="w-full mb-6 relative overflow-hidden">
        {/* Minecraft dirt block with hole */}
        <div className="relative">
          {/* Grass layer */}
          <div className="h-12 bg-green-700 rounded-t-lg relative overflow-hidden">
            {/* Grass texture */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-800 opacity-50"></div>
            <div className="absolute inset-0">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-green-500 opacity-30"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                ></div>
              ))}
            </div>

            {/* Edge gradient where grass meets dirt */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-green-800 to-brown-700 opacity-70"></div>
          </div>

          {/* Dirt block with hole */}
          <div className="py-8 relative bg-amber-950 rounded-b-lg shadow-inner min-h-64 flex flex-col justify-center">
            {/* Dirt texture */}
            <div className="absolute inset-0 rounded-b-lg overflow-hidden">
              {Array.from({ length: 200 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-sm bg-amber-900 opacity-20"
                  style={{
                    width: `${Math.random() * 12 + 4}px`,
                    height: `${Math.random() * 12 + 4}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                ></div>
              ))}
            </div>

            {/* Hole effect */}
            <div className="relative z-10 px-16">
              {/* content inside the hole */}
              <div className="bg-amber-950 rounded-lg px-4 pt-4 pb-8 shadow-inner border-4 border-amber-800">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-exlight-gold">
                    {openCard.name}
                  </h2>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link
                        to={`/app/${openCard.id}`}
                        className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md shadow-md border-2 border-green-600 transition-colors"
                      >
                        folder
                      </Link>
                    </Button>
                    <Button onClick={() => setOpenCardId(null)}>
                      Close
                    </Button>
                  </div>
                </div>

                {/* Top links displayed in the hole */}
                <div className="flex flex-col items-center justify-center gap-2">
                  {data.top_links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      className="block w-full bg-amber-800 hover:bg-amber-700 px-4 py-1 rounded-md text-center text-amber-100 transition-colors shadow-md border-2 border-amber-700"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
