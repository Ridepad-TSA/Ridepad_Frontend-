export function safeInternalPath(value, fallback = '/search') {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return fallback;
  try {
    const url = new URL(value, 'http://ridepad.local');
    if (url.origin !== 'http://ridepad.local') return fallback;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export function safeCustomerCallback(value) {
  const path = safeInternalPath(value, '/search');
  if (path === '/search' || path === '/trips' || path.startsWith('/booking/')) return path;
  return '/search';
}