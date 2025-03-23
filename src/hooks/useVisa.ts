import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { VisaType, VisaRequirement, VisaTimeline, ProcessingTime, CaseStatus, CommunityMatch } from '../types';
import { setVisaType, setRequirements, setTimeline, setProcessingTime, setCaseStatus, setCommunityMatches } from '../store/slices/visaSlice';

export const useVisa = () => {
  const dispatch = useDispatch();
  const currentVisaType = useSelector((state: RootState) => state.visa.currentVisaType);
  const requirements = useSelector((state: RootState) => state.visa.requirements);
  const timeline = useSelector((state: RootState) => state.visa.timeline);
  const processingTime = useSelector((state: RootState) => state.visa.processingTime);
  const caseStatus = useSelector((state: RootState) => state.visa.caseStatus);
  const communityMatches = useSelector((state: RootState) => state.visa.communityMatches);

  const selectVisaType = useCallback(async (type: VisaType) => {
    try {
      dispatch(setVisaType(type));
      // Here you would typically fetch requirements, timeline, etc. from your backend
      return true;
    } catch (error) {
      console.error('Error selecting visa type:', error);
      return false;
    }
  }, [dispatch]);

  const updateRequirements = useCallback(async (requirements: VisaRequirement[]) => {
    try {
      dispatch(setRequirements(requirements));
      return true;
    } catch (error) {
      console.error('Error updating requirements:', error);
      return false;
    }
  }, [dispatch]);

  const updateTimeline = useCallback(async (timeline: VisaTimeline[]) => {
    try {
      dispatch(setTimeline(timeline));
      return true;
    } catch (error) {
      console.error('Error updating timeline:', error);
      return false;
    }
  }, [dispatch]);

  const updateProcessingTime = useCallback(async (processingTime: ProcessingTime) => {
    try {
      dispatch(setProcessingTime(processingTime));
      return true;
    } catch (error) {
      console.error('Error updating processing time:', error);
      return false;
    }
  }, [dispatch]);

  const updateCaseStatus = useCallback(async (caseStatus: CaseStatus) => {
    try {
      dispatch(setCaseStatus(caseStatus));
      return true;
    } catch (error) {
      console.error('Error updating case status:', error);
      return false;
    }
  }, [dispatch]);

  const updateCommunityMatches = useCallback(async (matches: CommunityMatch[]) => {
    try {
      dispatch(setCommunityMatches(matches));
      return true;
    } catch (error) {
      console.error('Error updating community matches:', error);
      return false;
    }
  }, [dispatch]);

  return {
    currentVisaType,
    requirements,
    timeline,
    processingTime,
    caseStatus,
    communityMatches,
    selectVisaType,
    updateRequirements,
    updateTimeline,
    updateProcessingTime,
    updateCaseStatus,
    updateCommunityMatches,
  };
}; 