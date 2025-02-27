import { create } from "zustand";

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  isOn: boolean;
  message: string;
  type: ToastType;
  setIsOn: (isOn: boolean) => void;
  setMessage: (message: string) => void;
  setType: (type: ToastType) => void;
  resetToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOn: false,
  setIsOn: (IsOn: boolean) => set({ isOn: IsOn }),
  message: '',
  setMessage: (message: string) => set({ message }),
  type: 'info',
  setType: (type: ToastType) => set({ type }),
  resetToast: () => set({ message: '', type: 'info' }),
}))