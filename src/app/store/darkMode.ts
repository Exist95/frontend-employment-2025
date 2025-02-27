import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: localStorage.getItem('darkMode') === 'true',
  setDarkMode: (isDarkMode: boolean) => {
    localStorage.setItem('darkMode', isDarkMode.toString());
    set({ isDarkMode });
  }
}))