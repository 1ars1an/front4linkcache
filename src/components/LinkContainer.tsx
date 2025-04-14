import React from 'react';
import { cn } from '@/lib/utils';

import BookLink from './BookLink';

export default function LinkContainer({
  links,
  styles,
  activeIndex,
  setActiveIndex,
}) {
  return (
    <div
      className={cn(styles.bg, 'px-24 py-8 rounded-2xl space-y-4')}
    >
      <div className="bg-[url('/bookshelf.png')] h-20 rounded-t-xl bg-cover" />
      <div className="">
        <span className="text-black font-bold">Get Folder Name</span>
      </div>
      {links.map((link, idx) => (
        <BookLink
          key={idx}
          label={link.label}
          isActive={activeIndex === idx}
          onClick={() =>
            setActiveIndex(idx === activeIndex ? null : idx)
          }
        />
      ))}
    </div>
  );
}
