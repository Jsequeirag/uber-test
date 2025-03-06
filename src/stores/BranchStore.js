import { create } from "zustand";

const branchStore = create((set) => ({
  branches: [], //initial state
  formState: {}, //initial state
  setBranches: (newBranchesList) =>
    set(() => ({
      branches: newBranchesList,
    })),
  addBranch: (branch) =>
    set((state) => ({
      branches: [...state.branches, branch],
    })),
  deleteBranch: (idBranch) =>
    set((state) => ({
      branches: state.branches.filter((branch) => branch.id !== idBranch),
    })),
  setFormState: (e) =>
    set((state) => ({
      formState: { ...state.formState, [e.target.name]: e.target.value },
    })),
  setFormStateForEdit: (branch) =>
    set(() => ({
      formState: branch,
    })),
  resetFormState: () =>
    set(() => ({
      formState: {},
    })),
}));

export default branchStore;
