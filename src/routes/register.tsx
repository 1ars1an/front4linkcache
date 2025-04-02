import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { AuthForm } from '../components/Authform';

import { z } from 'zod';
import { formSchema } from '../components/Authform';

import { useRouteContext } from '@tanstack/react-router';
import type { AuthContext } from '../services/auth';

export const Route = createFileRoute('/register')({
  component: RegisterForm,
});

function RegisterForm() {
  const auth: AuthContext = useRouteContext({
    from: '/register',
  }).auth;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const isRegistered = await auth.registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      console.log(isRegistered);
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
