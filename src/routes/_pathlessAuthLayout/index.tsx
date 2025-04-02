import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathlessAuthLayout/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_pathlessAuthLayout/home"!</div>;
}
