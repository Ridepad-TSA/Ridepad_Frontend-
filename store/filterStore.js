import { create } from 'zustand';

const initialFilters = {
  area: '',
  category: '',
  startDate: null,
  endDate: null,
  minPrice: null,
  maxPrice: null,
  seats: null,
  transmission: '',
  sort: 'recommended',
};

/** Search filters shared by the search page, filter sheet and map. */
const useFilterStore = create((set) => ({
  ...initialFilters,
  setFilter: (key, value) => set({ [key]: value }),
  setFilters: (patch) => set(patch),
  reset: () => set(initialFilters),
}));

export const selectActiveFilterCount = (state) =>
  Object.keys(initialFilters).filter((key) => key !== 'sort' && state[key] !== initialFilters[key])
    .length;

export default useFilterStore;
