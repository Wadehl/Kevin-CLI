import { defineStore } from "pinia";

const useDemoStore = defineStore("demo", {
  state: () => {
    return {
      count: 0,
    };
  },
});

export default useDemoStore;
