import { create } from "zustand";

export interface ProblemInfoType {
  key: string;
  problemType: string;
  solvingCount: number;
  correctCount: number;
  ko_explanation: string;
  en_explanation: string;
  answer?: number;
}

interface ClientStatusType {
  isLogin: boolean;
  email: string | null;
  loadingState: "pending" | "loading" | "complete";
  AnalyzedProblem: ProblemInfoType | null;
  language: "한국어" | "English";
}

interface ClientStore {
  clientStatus: ClientStatusType;
  setClientStatus: (setValue: Partial<ClientStatusType>) => void;
  getClientStatus: () => ClientStatusType;
}

const useClientStore = create<ClientStore>((set, get) => ({
  clientStatus: {
    isLogin: false,
    email: null,
    loadingState: "pending",
    AnalyzedProblem: null,
    language: "한국어",
  },
  setClientStatus: (setValue) =>
    set((state) => ({
      clientStatus: { ...state.clientStatus, ...setValue },
    })),
  getClientStatus: () => get().clientStatus,
}));

export default useClientStore;
