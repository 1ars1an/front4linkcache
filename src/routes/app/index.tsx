import React from 'react';

import type { AuthContext } from '../../services/auth';
import {
  createFileRoute,
  useRouteContext,
} from '@tanstack/react-router';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const auth: AuthContext = useRouteContext({
    from: '/app/',
  }).auth;

  return <div>Hi</div>;
}
