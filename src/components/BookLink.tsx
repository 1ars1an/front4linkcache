import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function BookLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
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
        'cursor-pointer px-6 py-4 text-lg font-semibold text-white',
        'relative z-10 pixel-border'
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">{label}</div>
    </motion.div>
  );
}
