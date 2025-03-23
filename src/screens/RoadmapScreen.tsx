import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type RoadmapStep = {
  id: string;
  title: string;
  subtitle: string;
  isCompleted: boolean;
};

const roadmapSteps: RoadmapStep[] = [
  {
    id: '1',
    title: 'Submit I-485',
    subtitle: 'Application to Register Permanent Residence',
    isCompleted: true,
  },
  {
    id: '2',
    title: 'Biometrics Appointment',
    subtitle: 'USCIS Application Support Center',
    isCompleted: true,
  },
  {
    id: '3',
    title: 'EAD Card',
    subtitle: 'Employment Authorization Document',
    isCompleted: false,
  },
  {
    id: '4',
    title: 'Interview Scheduled',
    subtitle: 'USCIS Field Office',
    isCompleted: false,
  },
  {
    id: '5',
    title: 'Interview',
    subtitle: 'In-person interview with USCIS officer',
    isCompleted: false,
  },
  {
    id: '6',
    title: 'Final Decision',
    subtitle: 'Application approved or denied',
    isCompleted: false,
  },
];

export function RoadmapScreen(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Roadmap</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {roadmapSteps.map((step, index) => (
          <View key={step.id} style={styles.stepContainer}>
            <View style={styles.timelineContainer}>
              <View style={[styles.dot, step.isCompleted && styles.completedDot]} />
              {index < roadmapSteps.length - 1 && (
                <View style={[styles.line, step.isCompleted && styles.completedLine]} />
              )}
            </View>
            <TouchableOpacity style={styles.stepCard}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E9ECEF',
    borderWidth: 2,
    borderColor: '#ADB5BD',
  },
  completedDot: {
    backgroundColor: '#4C9AFF',
    borderColor: '#4C9AFF',
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: 4,
  },
  completedLine: {
    backgroundColor: '#4C9AFF',
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'column',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: '#6C757D',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{translateY: -12}],
    fontSize: 24,
    color: '#ADB5BD',
  },
}); 