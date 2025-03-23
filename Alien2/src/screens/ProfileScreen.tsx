import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Image
            source={{uri: 'https://i.pravatar.cc/300'}}
            style={styles.avatar}
          />
          <Text style={styles.username}>Username: renjit_joseph</Text>
        </View>
        <View style={styles.infoContainer}>
          <InfoItem title="Case Type" value="I-485 Adjustment of Status" />
          <InfoItem title="Receipt Number" value="MSC21904XXXXX" />
          <InfoItem title="Filed Date" value="March 15, 2024" />
          <InfoItem title="Category" value="Employment Based (EB-2)" />
          <InfoItem title="Current Status" value="Biometrics Completed" />
        </View>
      </View>
    </View>
  );
};

type InfoItemProps = {
  title: string;
  value: string;
};

const InfoItem: React.FC<InfoItemProps> = ({title, value}) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

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
  content: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  username: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#212529',
    fontWeight: '500',
  },
}); 