  import { create } from "zustand";

  export interface ProblemInfoType {
    answer: number;
    correctCount: number;
    explanation: string;
    key: string;
    problemType: string;
    solvingCount: number;
  }

  interface ClientStatusType {
    isLogin: boolean;
    email: string | null;
    loadingState: "pending" | "loading" | "complete";
    AnalyzedProblem: ProblemInfoType;
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
