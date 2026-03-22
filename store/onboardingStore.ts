import { create } from 'zustand';

interface OnboardingState {
  targetExam: 'JEE' | 'NEET';
  coursePercentage: number;
  hasTakenAssessment: boolean;
  setTargetExam: (exam: 'JEE' | 'NEET') => void;
  setCoursePercentage: (percentage: number) => void;
  setHasTakenAssessment: (status: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  targetExam: 'JEE',
  coursePercentage: 0,
  hasTakenAssessment: false,
  setTargetExam: (exam) => set({ targetExam: exam }),
  setCoursePercentage: (percentage) => set({ coursePercentage: percentage }),
  setHasTakenAssessment: (status) => set({ hasTakenAssessment: status }),
}));
