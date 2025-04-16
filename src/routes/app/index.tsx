import React from 'react';

import type { AuthContext } from '../../services/auth';
import {
  createFileRoute,
  useLoaderData,
  useRouteContext,
} from '@tanstack/react-router';

import { useQuery } from '@tanstack/react-query';

import {
  getAllUserFolders,
  getUserFolder,
} from '../../services/requests';

import type { paginatedFolderData } from '../../services/requests';

import LibraryGrid from '../../components/LibraryGrid';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [pageId, setPageId] = React.useState<number>(1);

  const { data, isPending } = useQuery({
    queryKey: ['folders', `${pageId}`],
    queryFn: () => getAllUserFolders(pageId),
    staleTime: 18000,
  });

  return (
    <>
      <div className="flex flex-col items-center min-h-screen">
        {isPending ? (
          <div>Loading</div>
        ) : (
          <LibraryGrid
            apiData={data as paginatedFolderData}
            pageId={pageId}
            setPageId={setPageId}
          />
        )}
      </div>
    </>
  );
}
