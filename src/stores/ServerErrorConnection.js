import { create } from "zustand";

const serverErrorConnection = create((set) => ({
  signalRErrorConnection: false,
  setSignalRErrorConnection: (parameter) =>
    set(() => ({
      signalRErrorConnection: parameter,
    })),
}));
export default serverErrorConnection;
