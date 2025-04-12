import React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/app/$fId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/$fId"!</div>;
}
