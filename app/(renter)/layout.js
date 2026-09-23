// Search and car detail are public, so auth is enforced per page (booking, checkout, trips).
export default function RenterLayout({ children }) {
  return <main className="flex-1">{children}</main>;
}
