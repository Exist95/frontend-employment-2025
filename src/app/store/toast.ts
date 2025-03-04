import { create } from "zustand";

export type ToastType = 'success' | 'error';

interface ToastState {
  isOn: boolean;
  message: string;
  type: ToastType;
  setIsOn: (isOn: boolean) => void;
  setMessage: (message: string) => void;
  setType: (type: ToastType) => void;
  showToast: (message: string, type: ToastType) => void;
  resetToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOn: false,
  setIsOn: (IsOn: boolean) => set({ isOn: IsOn }),
  message: '',
  setMessage: (message: string) => set({ message }),
  type: 'success',
  setType: (type: ToastType) => set({ type }),
  showToast: (message, type = 'success') => set({ message, type, isOn: true }),
  resetToast: () => set({ message: '', type: 'success' }),
}))