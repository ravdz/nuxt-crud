import { defineStore } from "pinia";
import { type MemberAccount } from "@/types/account";

export const authStore = defineStore("auth", {
  state: () => {
    return {
      user: null as MemberAccount | null,
    };
  },
  getters: {
    isLogged: (state): boolean => !!state.user,
  },
  actions: {
    setUser(user: MemberAccount | null): void {
      this.user = user;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
