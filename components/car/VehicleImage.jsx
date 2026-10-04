/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Car as CarIcon } from 'lucide-react';

function isBackendUpload(value) {
  try { return new URL(value).pathname.startsWith('/uploads/'); } catch { return value?.startsWith('/uploads/') ?? false; }
}

function VehiclePlaceholder() {
  return <div className="absolute inset-0 flex items-center justify-center bg-ink"><CarIcon className="size-12 text-white/25" strokeWidth={1.25} aria-hidden="true" /></div>;
}

export default function VehicleImage({ src, alt, sizes, className, priority = false }) {
  const [failed, setFailed] = useState(false);
  const backendUpload = isBackendUpload(src);
  useEffect(() => setFailed(false), [src]);
  if (!src || failed) return <VehiclePlaceholder />;
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} unoptimized={backendUpload} className={className} onError={() => setFailed(true)} />;
}