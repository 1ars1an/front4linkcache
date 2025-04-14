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
      className={cn(
        styles.bg,
        'p-6 rounded-2xl space-y-4 pixel-border sticky top-1/4 self-start z-20 h-fit'
      )}
      style={{
        imageRendering: 'pixelated',
        borderImage: styles.border,
        borderWidth: '8px',
        borderStyle: 'solid',
      }}
    >
      <div className="bg-[url('/bookshelf-top.png')] h-20 rounded-t-xl bg-cover" />
      <div className="flex justify-between items-center">
        <span className="text-white font-bold">Block Theme</span>
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
