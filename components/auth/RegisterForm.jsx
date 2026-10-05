'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import api, { clearAuthTokenCache } from '@/lib/api';
import { registerSchema } from '@/lib/validators/auth';
import { safeCustomerCallback } from '@/lib/authRedirect';

export default function RegisterForm() {
  const router = useRouter(); const searchParams = useSearchParams();
  const [formError, setFormError] = useState('');
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(registerSchema) });
  async function onSubmit(values) {
    setFormError('');
    try {
      await api.post('/auth/register', { name: values.name, email: values.email, phone: values.phone, password: values.password });
      const result = await signIn('credentials', { email: values.email, password: values.password, redirect: false });
      clearAuthTokenCache();
      if (!result || result.error) { router.push('/login'); return; }
      router.push(safeCustomerCallback(searchParams.get('callbackUrl'))); router.refresh();
    } catch (err) {
      setFormError(err.message || 'We could not create your account. Please try again.');
      for (const [field, message] of Object.entries(err.fieldErrors ?? {})) setError(field, { message });
    }
  }
  return <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate><Input label="Full name" type="text" autoComplete="name" error={errors.name?.message} {...register('name')} /><Input label="Email" type="email" autoComplete="username" error={errors.email?.message} {...register('email')} /><Input label="Phone" type="tel" autoComplete="tel" error={errors.phone?.message} {...register('phone')} /><Input label="Password" type="password" autoComplete="new-password" error={errors.password?.message} {...register('password')} /><Input label="Confirm password" type="password" autoComplete="new-password" error={errors.confirmPassword?.message} {...register('confirmPassword')} />{formError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{formError}</p>}<Button type="submit" fullWidth loading={isSubmitting}>{isSubmitting ? 'Creating account...' : 'Create account'}</Button></form>;
}
