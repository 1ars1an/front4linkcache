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
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '@/components/ui/badge';

import { ExternalLink } from 'lucide-react';
import { Clipboard } from 'lucide-react';

import LinkContainer from '../../components/LinkContainer';
import { LinkUpdateForm } from '../../components/LinkUpdateForm';

export interface Link {
  id: number;
  name: string;
  url: string;
  description: string;
  tags: string[];
}

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
  const [activeEdit, setActiveEdit] = useState<boolean>(false);

  const styles = blockStyles[selectedBlock] || blockStyles.obsidian;

  return isPending ? (
    <div>Loading</div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-2 w-full max-w-5xl gap-8">
        <div className="col-start-1 row-span-2 w-full flex items-center justify-center">
          <LinkContainer
            links={data.results}
            styles={styles}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setActiveEdit={setActiveEdit}
          />
        </div>
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex">
                    {data.results[activeIndex].name}
                  </CardTitle>
                  <CardDescription>
                    {data.results[activeIndex].description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-4 border-gray-800 p-1 bg-gray-300 rounded-lg shadow-lg">
                    <div className="grid grid-cols-3 gap-1 p-1">
                      {data.results[activeIndex].tags.map((tag) => (
                        <div key={tag.id} className="p">
                          {tag && (
                            <Badge className="px-2 py-2">
                              {' '}
                              {tag.name}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-4">
                    <Button
                      onClick={() =>
                        setActiveEdit(
                          activeEdit === true ? false : true
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        navigator.clipboard
                          .writeText(data.results[activeIndex].url)
                          .then(() => {
                            console.log('URL copied to clipboard!');
                            // Optionally show a toast/tooltip here
                          })
                          .catch((err) => {
                            console.error('Failed to copy: ', err);
                          });
                      }}
                    >
                      <Clipboard size={18} />
                    </Button>
                    <Button>
                      <a
                        href={data.results[activeIndex].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </motion.div>
        </div>
        {/* Placeholder second row */}
        <div className="col-start-2 row-start-2">
          {activeEdit && (
            <div className="border-4 border-gray-800 p-4 rounded-lg">
              <LinkUpdateForm></LinkUpdateForm>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
