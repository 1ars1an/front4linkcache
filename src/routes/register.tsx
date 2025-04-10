import React from 'react';
import {
  createFileRoute,
  useRouteContext,
  useRouter,
} from '@tanstack/react-router';
import { AuthForm, formSchema } from '../components/Authform';

import { z } from 'zod';

import type { AuthContext } from '../services/auth';
import { storeJson } from '../lib/utils';

export const Route = createFileRoute('/register')({
  component: RegisterForm,
});

function RegisterForm() {
  const auth: AuthContext = useRouteContext({
    from: '/register',
  }).auth;

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const isRegistered = await auth.registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      console.log(isRegistered);
      storeJson('authToken', isRegistered as string);
      router.history.push('/app/');
    } catch (error) {
      console.log(`error in form call - ${error}`);
    }
  }
  return (
    <div className="">
      <div className="flex justify-center items-center">
        <AuthForm displayEmail={true} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
