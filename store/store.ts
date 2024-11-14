import { create } from "zustand";

interface ClientStatusType {
  isLogin?: boolean;
  email?: string | null;
  loadingState?: string;
}

interface ClientStore {
  clientStatus: ClientStatusType;
  setClientStatus: (setValue: ClientStatusType) => void;
  getClientStatus: () => ClientStatusType;
}

const useClientStore = create<ClientStore>((set, get) => ({
  clientStatus: {
    isLogin: false,
    email: null,
    loadingState: "pending",
  },
  setClientStatus: (setValue) =>
    set((state) => ({
      clientStatus: { ...state.clientStatus, ...setValue },
    })),
  getClientStatus: () => get().clientStatus,
}));

export default useClientStore;
