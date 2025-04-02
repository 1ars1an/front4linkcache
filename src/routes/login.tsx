import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '../components/Authform';

import { z } from 'zod';
import { formSchema } from '../components/Authform';

import { useRouteContext } from '@tanstack/react-router';
import type { AuthContext } from '../services/auth';

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

  async function onSubmit(values: z.infer<typeof credentialsSchema>) {
    console.log('i ran');

    try {
      const loggedIn = await auth.loginUser({
        username: values.username,
        password: values.password,
      });
      console.log(loggedIn);
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
