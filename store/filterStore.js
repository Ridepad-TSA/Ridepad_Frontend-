import { create } from 'zustand';

const initialFilters = {
  area: '',
  categories: [],
  startDate: null,
  endDate: null,
  minPrice: null,
  maxPrice: null,
  seats: null,
  transmission: '',
  verifiedOnly: false,
  sort: 'recommended',
};

/** Search filters shared by the search page, filter sheet and map. */
const useFilterStore = create((set) => ({
  ...initialFilters,
  setFilter: (key, value) => set({ [key]: value }),
  setFilters: (patch) => set(patch),
  toggleCategory: (value) =>
    set((state) => ({
      categories: state.categories.includes(value)
        ? state.categories.filter((c) => c !== value)
        : [...state.categories, value],
    })),
  reset: () => set(initialFilters),
}));

export const selectActiveFilterCount = (state) =>
  Object.keys(initialFilters).filter((key) => {
    if (key === 'sort') return false;
    if (key === 'categories') return state.categories.length > 0;
    return state[key] !== initialFilters[key];
  }).length;

export default useFilterStore;
