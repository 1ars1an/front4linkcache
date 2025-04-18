import {
  createFileRoute,
  Outlet,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/app')({
  beforeLoad: async ({ context, location }) => {
    try {
      const response = await context.auth.isAuthenticated();
      console.log(response);
    } catch (error) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
