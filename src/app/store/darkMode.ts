import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false,
  setDarkMode: (isDarkMode: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', isDarkMode.toString());
    }
    set({ isDarkMode });
  }
}))