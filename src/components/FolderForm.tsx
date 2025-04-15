import React from 'react';
import { useState, useRef } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { FolderPlus } from 'lucide-react';

export function FolderPopover({
  onFolderCreate,
}: {
  onFolderCreate: (folderName: string) => void;
}) {
  const [folderName, setFolderName] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);

  function handleCreate() {
    if (!folderName.trim()) return;
    onFolderCreate(folderName); // Trigger the folder creation logic
    setFolderName(''); // Reset the input
    const closeButton = popoverRef.current?.querySelector(
      '[data-radix-popover-dismiss]'
    ) as HTMLElement;
    closeButton?.click(); // Close the popover automatically
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent focus-visible:ring-0"
          cursor="pointer"
          asChild
        >
          <FolderPlus size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent ref={popoverRef} className="w-64 space-y-2">
        <Input
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCreate();
            }
          }}
        />
        <Button
          onClick={handleCreate}
          className="w-full"
          data-radix-popover-dismiss
        >
          Create
        </Button>
      </PopoverContent>
    </Popover>
  );
}
