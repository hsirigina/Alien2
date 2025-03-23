import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

type TabProps = {
  title: string;
  isActive: boolean;
  onPress: () => void;
};

const Tab: React.FC<TabProps> = ({title, isActive, onPress}) => (
  <TouchableOpacity
    style={[styles.tab, isActive && styles.activeTab]}
    onPress={onPress}>
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const DocumentsScreen = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'info'>('scan');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documents</Text>
      <View style={styles.tabContainer}>
        <Tab
          title="Scan"
          isActive={activeTab === 'scan'}
          onPress={() => setActiveTab('scan')}
        />
        <Tab
          title="Info"
          isActive={activeTab === 'info'}
          onPress={() => setActiveTab('info')}
        />
      </View>
      <View style={styles.content}>
        {activeTab === 'scan' ? (
          <View style={styles.scanContainer}>
            <View style={styles.cameraPreview}>
              {/* Camera preview will go here */}
              <View style={styles.scanFrame} />
            </View>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan Document</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Document Requirements</Text>
            <Text style={styles.infoText}>
              • Clear, color copy of all pages{'\n'}
              • No blurry or dark images{'\n'}
              • Include all four corners{'\n'}
              • Ensure text is readable{'\n'}
              • File size under 10MB
            </Text>
          </View>
        )}
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: '#4C9AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#6C757D',
  },
  activeTabText: {
    color: '#FFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scanContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraPreview: {
    width: '100%',
    aspectRatio: 3/4,
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  scanFrame: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    borderWidth: 2,
    borderColor: '#4C9AFF',
    borderRadius: 8,
  },
  scanButton: {
    backgroundColor: '#4C9AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    marginTop: 24,
  },
  scanButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6C757D',
  },
}); 