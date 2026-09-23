import { create } from 'zustand';

const emptyDraft = {
  carId: null,
  startDate: null,
  endDate: null,
  pickupArea: '',
  delivery: false,
  note: '',
};

/** In-progress booking between car detail and checkout. */
const useBookingDraftStore = create((set) => ({
  ...emptyDraft,
  // Starting a draft for a different car discards the old one.
  startDraft: (carId) => set((state) => (state.carId === carId ? state : { ...emptyDraft, carId })),
  updateDraft: (patch) => set(patch),
  clearDraft: () => set(emptyDraft),
}));

export default useBookingDraftStore;
