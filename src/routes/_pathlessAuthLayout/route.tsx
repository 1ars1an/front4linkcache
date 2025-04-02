import React from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathlessAuthLayout')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet></Outlet>;
}
