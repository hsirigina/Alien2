/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

type FeatureCardProps = {
  title: string;
  description: string;
  onPress?: () => void;
};

function FeatureCard({title, description, onPress}: FeatureCardProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity 
      style={[
        styles.featureCard,
        {backgroundColor: isDarkMode ? Colors.darker : Colors.lighter}
      ]}
      onPress={onPress}
    >
      <Text style={[styles.featureTitle, {color: isDarkMode ? Colors.white : Colors.black}]}>
        {title}
      </Text>
      <Text style={[styles.featureDescription, {color: isDarkMode ? Colors.light : Colors.dark}]}>
        {description}
      </Text>
    </TouchableOpacity>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.header}>
          <Text style={[styles.title, {color: isDarkMode ? Colors.white : Colors.black}]}>
            Alien2
          </Text>
          <Text style={[styles.subtitle, {color: isDarkMode ? Colors.light : Colors.dark}]}>
            Your Immigration Assistant
          </Text>
        </View>
        <View style={styles.container}>
          <FeatureCard
            title="📋 Visa Roadmap"
            description="Get a personalized checklist based on your situation"
          />
          <FeatureCard
            title="📄 Document Scanner"
            description="Scan and validate your immigration documents"
          />
          <FeatureCard
            title="🌐 Language Tools"
            description="Translate and simplify legal language"
          />
          <FeatureCard
            title="⏱️ Timeline Predictor"
            description="Estimate your USCIS processing times"
          />
          <FeatureCard
            title="🔮 Case Prediction"
            description="AI-powered application outcome predictions"
          />
          <FeatureCard
            title="👥 Community"
            description="Connect with others on similar paths"
          />
          <FeatureCard
            title="💬 AI Assistant"
            description="Get case-specific guidance and answers"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },
  container: {
    padding: 16,
  },
  featureCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 16,
  },
});

export default App;
