import { create } from 'zustand';

interface EponaConversationIdState {
  conversationId: string | null;
  setConversationId: (id: string | null) => void;
}

export const useEponaConversationId = create<EponaConversationIdState>((set) => ({
  conversationId: null,
  setConversationId: (id) => set({ conversationId: id }),
})); 