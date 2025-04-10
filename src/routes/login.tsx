import React from 'react';
import {
  createFileRoute,
  useSearch,
  useRouter,
  useRouteContext,
} from '@tanstack/react-router';
import { AuthForm, formSchema } from '../components/Authform';

import { z } from 'zod';

import type { AuthContext } from '../services/auth';
import { storeJson } from '../lib/utils';

export const Route = createFileRoute('/login')({
  component: LoginForm,
});

const credentialsSchema = formSchema.pick({
  username: true,
  password: true,
});

function LoginForm() {
  const auth: AuthContext = useRouteContext({
    from: '/login',
  }).auth;

  const search = useSearch('/login');
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof credentialsSchema>) {
    try {
      const loggedIn = await auth.loginUser({
        username: values.username,
        password: values.password,
      });

      storeJson('authToken', loggedIn as string);
      const redirectTo = search.redirect || '/app/';
      router.history.push(redirectTo);
    } catch (error) {
      console.log(`error in form call - ${error}`);
    }
  }

  return (
    <div className="">
      <div className="flex justify-center items-center">
        <AuthForm displayEmail={false} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
