'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import Input from '@/components/ui/Input';
import api, { clearAuthTokenCache } from '@/lib/api';
import { registerSchema } from '@/lib/validators/auth';
import { ROLES } from '@/lib/constants';

const ROLE_OPTIONS = [
  { value: ROLES.RENTER, label: 'Rent a car', body: 'Book cars from verified owners.' },
  { value: ROLES.OWNER, label: 'List your car', body: 'Earn from your car when it sits idle.' },
];

export default function RegisterForm() {
  const router = useRouter();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: ROLES.RENTER },
  });
  const role = useWatch({ control, name: 'role' });

  async function onSubmit(values) {
    setFormError('');
    try {
      await api.post('/auth/register', {
        name: values.name,
        identifier: values.identifier,
        password: values.password,
        role: values.role,
      });

      const result = await signIn('credentials', {
        identifier: values.identifier,
        password: values.password,
        redirect: false,
      });

      clearAuthTokenCache();

      if (!result || result.error) {
        router.push('/login');
        return;
      }

      router.push('/verify');
      router.refresh();
    } catch (err) {
      setFormError(err.message);
      for (const [field, message] of Object.entries(err.fieldErrors ?? {})) {
        if (field in values) setError(field, { message });
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4" noValidate>
      <div>
        <span className="mb-1.5 block text-sm font-medium text-ink">I want to</span>
        <div className="grid grid-cols-2 gap-3">
          {ROLE_OPTIONS.map((option) => (
            <label
              key={option.value}
              className={clsx(
                'cursor-pointer rounded-lg border p-3 text-sm transition-colors',
                role === option.value ? 'border-burgundy bg-burgundy-tint' : 'border-line hover:border-burgundy',
              )}
            >
              <input type="radio" value={option.value} className="sr-only" {...register('role')} />
              <span className="block font-semibold text-ink">{option.label}</span>
              <span className="mt-0.5 block text-xs text-ink-soft">{option.body}</span>
            </label>
          ))}
        </div>
        {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
      </div>

      <Input label="Full name" type="text" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input
        label="Email or phone"
        type="text"
        autoComplete="username"
        error={errors.identifier?.message}
        {...register('identifier')}
      />
      <Input
        label="Password"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      <Input
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {formError && (
        <p role="alert" className="text-sm text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex min-h-11 w-full items-center justify-center rounded-lg bg-burgundy px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy-bright disabled:cursor-not-allowed disabled:bg-burgundy/50"
      >
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  );
}
