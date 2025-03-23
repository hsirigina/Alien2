import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RoadmapScreen} from './src/screens/RoadmapScreen';
import {DocumentsScreen} from './src/screens/DocumentsScreen';
import {ProfileScreen} from './src/screens/ProfileScreen';
import {StyleSheet, Text} from 'react-native';
import {RootTabParamList} from './src/types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: '#4C9AFF',
            tabBarInactiveTintColor: '#6C757D',
          }}>
          <Tab.Screen
            name="Roadmap"
            component={RoadmapScreen}
            options={{
              tabBarIcon: ({color}: {color: string}) => (
                <Text style={[styles.tabIcon, {color}]}>📋</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Documents"
            component={DocumentsScreen}
            options={{
              tabBarIcon: ({color}: {color: string}) => (
                <Text style={[styles.tabIcon, {color}]}>📄</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({color}: {color: string}) => (
                <Text style={[styles.tabIcon, {color}]}>👤</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 8,
    paddingBottom: 8,
    height: 60,
  },
  tabIcon: {
    fontSize: 24,
  },
});

export default App; 