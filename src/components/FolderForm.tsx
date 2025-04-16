import React from 'react';

import { useState, useRef } from 'react';

import { useMutation } from '@tanstack/react-query';

import { createNewFolderMutation } from '../services/requests';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { FolderPlus } from 'lucide-react';

export function FolderPopover() {
  const [folderName, setFolderName] = useState<string>('');

  const { mutate } = createNewFolderMutation();

  function handleCreate() {
    if (!folderName.trim()) return;
    mutate(folderName); // trigger the folder creation logic
    setFolderName('');
    setIsOpen(false); // Close the popover
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
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
      <PopoverContent className="w-64 space-y-2">
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
        <Button onClick={handleCreate} className="w-full">
          Create
        </Button>
      </PopoverContent>
    </Popover>
  );
}
