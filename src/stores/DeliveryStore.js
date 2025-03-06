import { create } from "zustand";
import { searchFilter } from "../utils/filters/filters";
const deliveryStore = create((set, get) => ({
  totalDeliveries: 0,
  setTotalDeliveries: (number) => {
    set(() => ({
      totalDeliveries: number,
    }));
  },
  deliveries: [{}], //init state
  branchSelected: "none",
  searchString: "",
  orderByDate: false,
  dateSelected: "none",
  setDeliveries: (deliveries) =>
    set((state) => ({
      deliveries: searchFilter(
        deliveries,
        state.searchString,
        state.orderByDate,
        state.branchSelected,
        state.dateSelected
      ),
    })),
  setSearch: (newSearchString) =>
    set(() => ({
      searchString: newSearchString,
    })),
  setDeliveriesWithSearch: (search, deliveries) => {
    get().setSearch(search);
    get().setDeliveries(deliveries);
  },
  setOrderByDate: (deliveries) => {
    set((state) => ({
      orderByDate: !state.orderByDate,
    }));
    get().setDeliveries(deliveries);
  },
  setBranchSelected: (branchSelected, deliveries) => {
    set(() => ({
      branchSelected: branchSelected,
    }));
    get().setDeliveries(deliveries);
  },
  setDateSelected: (dateSelected, deliveries) => {
    set(() => ({
      dateSelected: dateSelected,
    }));
    get().setDeliveries(deliveries);
  },
}));
export default deliveryStore;
