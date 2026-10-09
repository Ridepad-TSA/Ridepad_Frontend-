
import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
return ( <footer className="border-t border-white/10 bg-night text-white/70"> <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6"> <div> <Link href="/" className="text-white"> <Logo /> </Link> <p className="mt-3 max-w-xs text-sm">
Simple and reliable vehicle rentals for your journeys in Lagos. </p> </div>

```
    <div>
      <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/" className="hover:text-white">Home</Link>
        <Link href="/search" className="hover:text-white">Rent a Car</Link>
        <Link href="/about" className="hover:text-white">About Us</Link>
        <Link href="/contact" className="hover:text-white">Contact Us</Link>
      </nav>
    </div>

    <div>
      <h3 className="mb-3 font-semibold text-white">Need Help?</h3>
      <p className="text-sm">
        Have questions about renting a car? Contact our team for assistance.
      </p>
      <Link
        href="/contact"
        className="mt-3 inline-block text-sm font-semibold text-white hover:text-burgundy-bright"
      >
        Get in touch →
      </Link>
    </div>
  </div>

  <div className="border-t border-white/10 px-4 py-5 text-center text-xs sm:px-6">
    © {new Date().getFullYear()} Ridepad. All rights reserved.
  </div>
</footer>

);
}
