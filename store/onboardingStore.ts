import { create } from 'zustand';

interface OnboardingState {
  targetExam: 'JEE' | 'NEET';
  userClass: '11th' | '12th' | 'Dropper';
  coursePercentage: number;
  hasTakenAssessment: boolean;
  setTargetExam: (exam: 'JEE' | 'NEET') => void;
  setUserClass: (cls: '11th' | '12th' | 'Dropper') => void;
  setCoursePercentage: (percentage: number) => void;
  setHasTakenAssessment: (status: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  targetExam: 'JEE',
  userClass: '12th', // default value
  coursePercentage: 0,
  hasTakenAssessment: false,
  setTargetExam: (exam) => set({ targetExam: exam }),
  setUserClass: (cls) => set({ userClass: cls }),
  setCoursePercentage: (percentage) => set({ coursePercentage: percentage }),
  setHasTakenAssessment: (status) => set({ hasTakenAssessment: status }),
}));
