import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VisaRequirement {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
}

interface VisaTimeline {
  stage: string;
  estimatedDuration: string;
  startDate?: string;
  endDate?: string;
  status: 'pending' | 'in_progress' | 'completed';
}

interface VisaState {
  currentVisaType: string;
  requirements: VisaRequirement[];
  timeline: VisaTimeline[];
  processingTime: {
    estimated: string;
    confidence: number;
    factors: string[];
  } | null;
  caseStatus: {
    current: string;
    lastUpdated: string;
    nextSteps: string[];
  } | null;
  communityMatches: {
    id: string;
    name: string;
    visaType: string;
    successRate: number;
    tips: string[];
  }[];
}

const initialState: VisaState = {
  currentVisaType: '',
  requirements: [],
  timeline: [],
  processingTime: null,
  caseStatus: null,
  communityMatches: [],
};

const visaSlice = createSlice({
  name: 'visa',
  initialState,
  reducers: {
    setVisaType: (state, action: PayloadAction<string>) => {
      state.currentVisaType = action.payload;
    },
    setRequirements: (state, action: PayloadAction<VisaRequirement[]>) => {
      state.requirements = action.payload;
    },
    updateRequirement: (state, action: PayloadAction<VisaRequirement>) => {
      const index = state.requirements.findIndex(req => req.id === action.payload.id);
      if (index !== -1) {
        state.requirements[index] = action.payload;
      }
    },
    setTimeline: (state, action: PayloadAction<VisaTimeline[]>) => {
      state.timeline = action.payload;
    },
    updateTimelineStage: (state, action: PayloadAction<{ stage: string; status: VisaTimeline['status'] }>) => {
      const stage = state.timeline.find(s => s.stage === action.payload.stage);
      if (stage) {
        stage.status = action.payload.status;
      }
    },
    setProcessingTime: (state, action: PayloadAction<VisaState['processingTime']>) => {
      state.processingTime = action.payload;
    },
    setCaseStatus: (state, action: PayloadAction<VisaState['caseStatus']>) => {
      state.caseStatus = action.payload;
    },
    setCommunityMatches: (state, action: PayloadAction<VisaState['communityMatches']>) => {
      state.communityMatches = action.payload;
    },
    resetVisa: () => initialState,
  },
});

export const {
  setVisaType,
  setRequirements,
  updateRequirement,
  setTimeline,
  updateTimelineStage,
  setProcessingTime,
  setCaseStatus,
  setCommunityMatches,
  resetVisa,
} = visaSlice.actions;

export default visaSlice.reducer; 