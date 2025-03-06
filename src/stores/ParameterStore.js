import { create } from "zustand";

const parameterStore = create((set) => ({
  parameters: {},
  setParameters: (newParameters) =>
    set(() => ({
      parameters: newParameters,
    })),
  setCheckedParameters: (newParameters) =>
    set((state) => ({
      parameters: { ...state.parameters, ...newParameters },
    })),
}));
export default parameterStore;
