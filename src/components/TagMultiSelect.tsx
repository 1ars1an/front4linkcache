import React from 'react';
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from '@/components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function TagMultiSelect({
  value,
  onChange,
  options,
}: {
  value: number[];
  onChange: (val: number[]) => void;
  options: { id: number; name: string }[];
}) {
  const selectedTags = options.filter((opt) =>
    value.includes(opt.id)
  );

  const toggleTag = (id: number) => {
    onChange(
      value.includes(id)
        ? value.filter((v) => v !== id)
        : [...value, id]
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start flex-wrap min-h-[2.5rem]"
        >
          {selectedTags.length === 0
            ? 'Select tags'
            : selectedTags.map((tag) => (
                <Badge key={tag.id} className="mr-1 mb-1">
                  {tag.name}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTag(tag.id);
                    }}
                  />
                </Badge>
              ))}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search tags..." />
          <CommandList>
            <CommandEmpty>No tags found</CommandEmpty>
            <CommandGroup>
              {options.map((opt) => (
                <CommandItem
                  key={opt.id}
                  onSelect={() => toggleTag(opt.id)}
                  className="cursor-pointer"
                >
                  <span>{opt.name}</span>
                  {value.includes(opt.id) && (
                    <span className="ml-auto">✔</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
