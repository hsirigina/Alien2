import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type TimelineItemProps = {
  title: string;
  description: string;
  isCompleted?: boolean;
  isLast?: boolean;
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  description,
  isCompleted = false,
  isLast = false,
}) => (
  <View style={styles.timelineItemContainer}>
    <View style={styles.timelineLeft}>
      <View style={[styles.dot, isCompleted && styles.completedDot]} />
      {!isLast && <View style={styles.line} />}
    </View>
    <TouchableOpacity style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  </View>
);

export const RoadmapScreen = () => {
  const steps = [
    {
      title: 'Submit I-485',
      description: 'Application to Register Permanent Residence',
      isCompleted: true,
    },
    {
      title: 'Biometrics Appointment',
      description: 'USCIS Application Support Center',
      isCompleted: true,
    },
    {
      title: 'EAD Card',
      description: 'Employment Authorization Document',
      isCompleted: false,
    },
    {
      title: 'Interview Scheduled',
      description: 'USCIS Field Office',
      isCompleted: false,
    },
    {
      title: 'Interview',
      description: 'In-person interview with USCIS officer',
      isCompleted: false,
    },
    {
      title: 'Final Decision',
      description: 'Application approved or denied',
      isCompleted: false,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roadmap</Text>
      <ScrollView style={styles.scrollView}>
        {steps.map((step, index) => (
          <TimelineItem
            key={index}
            title={step.title}
            description={step.description}
            isCompleted={step.isCompleted}
            isLast={index === steps.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    padding: 16,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  timelineItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 12,
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E9ECEF',
    borderWidth: 2,
    borderColor: '#CED4DA',
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
  card: {
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
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6C757D',
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -12,
    fontSize: 24,
    color: '#CED4DA',
  },
}); 