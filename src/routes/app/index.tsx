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

import LibraryGrid from '../../components/LibraryGrid';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth: AuthContext = useRouteContext({
    from: '/app/',
  }).auth;

  const { data, isPending } = useQuery({
    queryKey: ['folders'],
    queryFn: getAllUserFolders,
  });

  return (
    <>
      <div>
        {isPending ? (
          <div>Loading</div>
        ) : (
          <LibraryGrid folders={data} />
        )}
      </div>
    </>
  );
}
