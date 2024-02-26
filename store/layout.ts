import { defineStore } from "pinia";

export const layoutStore = defineStore("layout", {
  state: () => {
    return {
      loading: false,
    };
  },

  actions: {
    setLoading(value: boolean): void {
      this.loading = value;
    },
  },
});
