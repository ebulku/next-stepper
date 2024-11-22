import { LucideIcon } from 'lucide-react'
import { create } from 'zustand'

export type FormOption = {
  id: string
  title: string
  description: string
  icon: LucideIcon
  image: string
}

type FormState = {
  currentStep: number
  selections: Record<number, string>
  autoProgress: boolean
  setStep: (step: number) => void
  setSelection: (step: number, optionId: string) => void
  setAutoProgress: (enabled: boolean) => void
  resetForm: () => void
}

export const useFormStore = create<FormState>((set) => ({
  currentStep: 0,
  selections: {},
  autoProgress: true,
  setStep: (step) => set({ currentStep: step }),
  setSelection: (step, optionId) =>
    set((state) => ({
      selections: { ...state.selections, [step]: optionId },
      currentStep:
        state.autoProgress && step < 2 ? step + 1 : state.currentStep,
    })),
  setAutoProgress: (enabled) => set({ autoProgress: enabled }),
  resetForm: () => set({ currentStep: 0, selections: {} }),
}))
