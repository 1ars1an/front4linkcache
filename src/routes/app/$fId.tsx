import React, { useState } from 'react';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { getAllFolderLinks } from '../../services/requests';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import LinkContainer from '../../components/LinkContainer';

export const Route = createFileRoute('/app/$fId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { fId } = useParams({
    from: '/app/$fId',
  });

  const [page, setPage] = React.useState<number>(1);
  const { data, isPending } = useQuery({
    queryKey: ['allLinks', `${fId}`, `${page}`],
    queryFn: () => getAllFolderLinks(fId, page),
  });

  console.log(data);

  const blockStyles: Record<string, { bg: string; border: string }> =
    {
      obsidian: {
        bg: "bg-[url('/obsidian-bg.png')]",
        border: "url('/obsidian-border.png') 30 stretch",
      },
      bookshelf: {
        bg: "bg-[url('/bookshelf-bg.png')]",
        border: "url('/bookshelf-border.png') 30 stretch",
      },
      glowstone: {
        bg: "bg-[url('/glowstone-bg.png')]",
        border: "url('/glowstone-border.png') 30 stretch",
      },
    };

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [selectedBlock, setSelectedBlock] = useState('bookshelf');

  const styles = blockStyles[selectedBlock] || blockStyles.obsidian;

  return isPending ? (
    <div>Loading</div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-2 w-full max-w-5xl">
        <LinkContainer
          links={data.results}
          styles={styles}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        {/* detail block in right column, top row */}
        <div className="col-start-2 row-start-1">
          <motion.div
            initial={false}
            animate={{
              x: activeIndex !== null ? 0 : -400,
              opacity: activeIndex !== null ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 30,
            }}
          >
            {activeIndex !== null && (
              <div
                className={cn(
                  'w-full min-h-[200px] p-6 rounded-xl shadow-inner border text-black',
                  styles.bg,
                  'pixel-border'
                )}
                style={{
                  imageRendering: 'pixelated',
                  borderImage: styles.border,
                  borderWidth: '8px',
                  borderStyle: 'solid',
                }}
              >
                <div>details for:</div>
              </div>
            )}
          </motion.div>
        </div>
        {/* Placeholder second row */}
        <div className="col-start-2 row-start-2">
          <div>HIIII</div>
        </div>
      </div>
    </div>
  );
}
