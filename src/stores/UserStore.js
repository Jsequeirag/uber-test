import { create } from "zustand";

const userState = create((set) => ({
  users: [],
  formState: {},
  setUsers: (newUsersList) =>
    set(() => ({
      users: newUsersList,
    })),
  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),
  deleteUser: (idUser) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== idUser),
    })),
  setFormState: (e) =>
    set((state) => ({
      formState: { ...state.formState, [e.target.name]: e.target.value },
    })),
  setFormStateForEdit: (user) =>
    set(() => ({
      formState: user,
    })),
  resetFormState: () =>
    set(() => ({
      formState: {},
    })),
  formHidden: true,
  setFormHidden: () =>
    set((state) => ({
      formHidden: !state.formHidden,
    })),
}));
export default userState;
