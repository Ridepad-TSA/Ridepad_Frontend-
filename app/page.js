import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CarCard from '@/components/car/CarCard';
import HeroSearchForm from '@/components/home/HeroSearchForm';
import { CAR_CATEGORIES } from '@/lib/constants';
import {
  HERO_STATS,
  FEATURED_CARS,
  BRANDS,
  WHY_BOOK,
  TESTIMONIALS,
} from '@/lib/data/home';

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-night text-white">
          <div className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-6 sm:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-xs font-semibold tracking-wide text-burgundy-bright uppercase">
                  Escrow-protected bookings in Lagos
                </p>
                <h1 className="font-display text-4xl font-extrabold sm:text-5xl">
                  Rent a car from people you can{' '}
                  <span className="text-burgundy-bright">actually trust</span>
                </h1>
                <p className="mt-4 max-w-md text-white/70">
                  Verified owners, verified renters, photo check-ins and money held in escrow
                  until the car comes back. Chauffeured by default. Self drive when you&apos;ve
                  earned it.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href="/search"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg bg-burgundy-bright px-5 text-sm font-semibold text-white transition-colors hover:bg-burgundy"
                  >
                    Browse cars
                  </Link>
                  <Link
                    href="/listings/new"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Earn from your car
                  </Link>
                </div>

                <dl className="mt-10 flex gap-8">
                  {HERO_STATS.map((stat) => (
                    <div key={stat.label}>
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="font-display text-2xl font-extrabold">{stat.value}</dd>
                      <p className="text-xs text-white/60">{stat.label}</p>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <Image
                  src="/images/hero-car.jpg"
                  alt="Featured car on Ridepad"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mt-10 lg:mt-16">
              <HeroSearchForm />
            </div>
          </div>
        </section>

        {/* Cars available now */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-ink">Cars available now</h2>
            <Link
              href="/search"
              className="inline-flex items-center gap-1 text-sm font-semibold text-burgundy hover:text-burgundy-bright"
            >
              See all cars <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURED_CARS.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </section>

        {/* Browse by brand / category */}
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="font-display text-lg font-bold text-ink">Browse by brand</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {BRANDS.map((brand) => (
                  <Link
                    key={brand.value}
                    href={`/search?brand=${brand.value}`}
                    className="rounded-xl border border-line px-3 py-3 text-sm transition-colors hover:border-burgundy hover:bg-burgundy-tint"
                  >
                    <p className="font-semibold text-ink">{brand.label}</p>
                    <p className="text-xs text-ink-soft">{brand.count} cars</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="font-display text-lg font-bold text-ink">Browse by category</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {CAR_CATEGORIES.map((category) => (
                  <Link
                    key={category.value}
                    href={`/search?category=${category.value}`}
                    className="rounded-xl border border-line px-3 py-3 text-sm font-semibold text-ink transition-colors hover:border-burgundy hover:bg-burgundy-tint"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why book on Ridepad */}
        <section className="bg-surface py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold text-ink">Why book on Ridepad</h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_BOOK.map((item) => (
                <div key={item.title} className="rounded-2xl border border-line p-5">
                  <span className="inline-flex size-9 items-center justify-center rounded-lg bg-burgundy-tint font-display font-bold text-burgundy">
                    {item.letter}
                  </span>
                  <h3 className="mt-3 font-display text-sm font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-ink">What renters and owners say</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex gap-0.5 text-burgundy-bright" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4"
                      fill={i < t.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-ink">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-burgundy-tint text-xs font-bold text-burgundy">
                    {t.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.meta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-burgundy px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <div>
              <p className="text-xs font-semibold tracking-wide text-white/70 uppercase">
                Earn from an idle car
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold text-white">
                List your car and get paid after every trip
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/80">
                Set your own price and availability. We verify renters, hold the deposit and pay
                into your wallet once the car is back and the photos are confirmed.
              </p>
            </div>
            <Link
              href="/listings/new"
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-burgundy transition-colors hover:bg-white/90"
            >
              Start listing
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
