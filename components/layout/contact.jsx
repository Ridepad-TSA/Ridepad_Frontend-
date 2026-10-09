

import Link from 'next/link';

export default function ContactPage() {
return ( <main className="flex-1 bg-white"> <section className="bg-night px-4 py-16 text-white sm:px-6"> <div className="mx-auto max-w-4xl"> <p className="text-sm font-semibold uppercase tracking-wider text-burgundy-bright">
Contact Us </p>

      <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
        How can we help you?
      </h1>

      <p className="mt-5 max-w-xl leading-7 text-white/70">
        Have a question about our vehicles or your booking? Get in touch
        with our team, and we will be happy to assist you.
      </p>
    </div>
  </section>

  <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
    <div className="rounded-2xl border border-gray-200 p-6 sm:p-10">
      <h2 className="font-display text-2xl font-bold text-ink">
        Get in touch
      </h2>

      <p className="mt-3 leading-7 text-ink-soft">
        Whether you need help with vehicle availability, reservations,
        payments, or an existing booking, our team is ready to hear from you.
      </p>

      <div className="mt-8">
        <h3 className="font-semibold text-ink">Email us</h3>

        <a
          href="mailto:ridepad@gmail.com"
          className="mt-2 inline-block text-burgundy-bright underline underline-offset-4"
        >
          ridepad@gmail.com
        </a>

        <p className="mt-3 text-sm leading-6 text-ink-soft">
          Click the email address to contact our team through your
          preferred email application.
        </p>
      </div>

      <a
        href="mailto:ridepad@gmail.com?subject=Ridepad%20Customer%20Enquiry"
        className="mt-6 inline-block rounded-lg bg-burgundy-bright px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Send Us an Email
      </a>

      <div className="mt-10 border-t border-gray-200 pt-6">
        <h3 className="font-semibold text-ink">
          Looking for a vehicle?
        </h3>

        <p className="mt-2 text-sm leading-6 text-ink-soft">
          Browse our available vehicles and find the right car for your trip.
        </p>

        <Link
          href="/search"
          className="mt-4 inline-block rounded-lg border border-gray-300 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gray-50"
        >
          Browse Vehicles
        </Link>
      </div>
    </div>
  </section>
</main>

);
}

