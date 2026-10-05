'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSession, signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { loginSchema } from '@/lib/validators/auth';
import { clearAuthTokenCache } from '@/lib/api';
import { safeCustomerCallback } from '@/lib/authRedirect';

function messageForLoginError(error) {
  if (error === 'CredentialsSignin') return 'Email or password is incorrect.';
  if (error === 'AUTH_REQUEST_FAILED') return 'Unable to sign in right now. Please check your details and try again.';
  return 'Unable to connect to Ridepad. Please try again.';
}

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [formError, setFormError] = useState('');
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema) });
  async function onSubmit(values) {
    setFormError('');
    const result = await signIn('credentials', { email: values.email, password: values.password, redirect: false });
    if (!result || result.error) { setFormError(messageForLoginError(result?.error)); return; }
    clearAuthTokenCache();
    const session = await getSession();
    router.push(session?.user?.role === 'admin' ? '/admin/overview' : safeCustomerCallback(callbackUrl));
    router.refresh();
  }
  return <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate><Input label="Email" type="email" autoComplete="username" error={errors.email?.message} {...register('email')} /><Input label="Password" type="password" autoComplete="current-password" error={errors.password?.message} {...register('password')} />{formError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{formError}</p>}<div className="flex justify-end"><Link href="/forgot-password" className="text-sm font-medium text-burgundy hover:text-burgundy-bright">Forgot password?</Link></div><Button type="submit" fullWidth loading={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Sign in'}</Button></form>;
}
