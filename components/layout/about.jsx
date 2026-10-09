import Link from 'next/link';

export const metadata = {
title: 'About Us | Ridepad',
description: 'Learn more about Ridepad and our car rental services in Lagos.',
};

export default function AboutPage() {
return ( <main className="flex-1 bg-white"> <section className="bg-night px-4 py-20 text-white sm:px-6"> <div className="mx-auto max-w-4xl"> <p className="text-sm font-semibold uppercase tracking-wider text-burgundy-bright">
About Ridepad </p>

      <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
        Making your next journey easier.
      </h1>

      <p className="mt-6 max-w-2xl leading-7 text-white/70">
        Ridepad is a car rental platform designed to make finding and
        requesting a vehicle simple and convenient. We help customers
        explore available vehicles and request bookings through an
        accessible online experience.
      </p>
    </div>
  </section>

  <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
    <h2 className="font-display text-2xl font-bold text-ink">
      Our Mission
    </h2>

    <p className="mt-4 leading-7 text-ink-soft">
      Our mission is to simplify the car rental process by making vehicle
      discovery and booking requests easier for our customers.
    </p>

    <h2 className="mt-10 font-display text-2xl font-bold text-ink">
      Why Ridepad?
    </h2>

    <ul className="mt-4 space-y-3 leading-7 text-ink-soft">
      <li>Explore available rental vehicles in one place.</li>
      <li>Request bookings through a straightforward workflow.</li>
      <li>Manage your bookings through your account.</li>
      <li>Get assistance when you need help with your rental.</li>
    </ul>

    <Link
      href="/search"
      className="mt-8 inline-block rounded-lg bg-burgundy-bright px-5 py-3 text-sm font-semibold text-white"
    >
      Explore Our Vehicles
    </Link>
  </section>
</main>


);
}
