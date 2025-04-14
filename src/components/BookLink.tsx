import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

import { ExternalLink } from 'lucide-react';

import type { Link } from '../routes/app/$fId';

export default function BookLink({
  link,
  isActive,
  onClick,
  setActiveEdit,
}: {
  link: Link; //type this correctly
  isActive: boolean;
  onClick: () => void;
  setActiveEdit: (value: boolean) => void;
}) {
  console.log(link);
  return (
    <motion.div
      layout
      initial={false}
      animate={{
        y: isActive ? -16 : 0,
        scale: isActive ? 1.03 : 1,
        rotateX: isActive ? 8 : 0,
        boxShadow: isActive
          ? '0px 18px 24px rgba(0,0,0,0.5)'
          : '0px 4px 6px rgba(0,0,0,0.2)',
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'rounded-xl border border-purple-800 bg-[#2e1b40]',
        'cursor-pointer text-sm font-semibold  py-2 px-2 text-white'
      )}
      onClick={() => {
        setActiveEdit(false);
        onClick();
      }}
    >
      <div className="flex items-center">
        <div className="mr-auto">{link.name}</div>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-white hover:text-purple-400"
        >
          <ExternalLink size={20} />
        </a>
      </div>
    </motion.div>
  );
}
