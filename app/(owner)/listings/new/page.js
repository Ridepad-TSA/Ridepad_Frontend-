import ListingWizard from '@/components/owner/ListingWizard';

export default function NewListingPage() {
  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-xl font-bold text-ink">List a car</h1>
        <p className="mt-1 mb-6 text-sm text-ink-soft">
          Set your own price and availability. We verify renters and hold every booking in escrow.
        </p>
        <ListingWizard mode="create" />
      </div>
    </div>
  );
}
