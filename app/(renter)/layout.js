import AppNavbar from '@/components/layout/AppNavbar';

// Search and car detail are public, so auth is enforced per page (booking, checkout, trips).
export default function RenterLayout({ children }) {
  return (
    <div className="flex flex-1 flex-col">
      <AppNavbar />
      <main className="flex-1 bg-canvas">{children}</main>
    </div>
  );
}
