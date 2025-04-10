import React from 'react';

import type { AuthContext } from '../../services/auth';
import {
  createFileRoute,
  useRouteContext,
} from '@tanstack/react-router';

import { useQuery } from '@tanstack/react-query';

import {
  getAllUserFolders,
  getUserFolder,
} from '../../services/requests';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
  beforeLoad: async () => {
    try {
      const response = await getAllUserFolders();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
});

function RouteComponent() {
  const auth: AuthContext = useRouteContext({
    from: '/app/',
  }).auth;

  return <div>Hi</div>;
}
