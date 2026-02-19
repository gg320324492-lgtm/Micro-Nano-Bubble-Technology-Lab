import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View, StyleSheet, Platform } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import PeopleScreen from './screens/PeopleScreen';
import PublicationsScreen from './screens/PublicationsScreen';
import ResearchScreen from './screens/ResearchScreen';
import IndustrialScreen from './screens/IndustrialScreen';
import ResearchDetailScreen from './screens/ResearchDetailScreen';
import IndustrialDetailScreen from './screens/IndustrialDetailScreen';
import { colors } from './theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, { active: string; inactive: string }> = {
    Home: { active: '🏠', inactive: '🏡' },
    People: { active: '👥', inactive: '👤' },
    Publications: { active: '📄', inactive: '📃' },
    Research: { active: '🔬', inactive: '🔭' },
    Industrial: { active: '🏭', inactive: '🏗️' },
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={[styles.icon, focused && styles.iconActive]}>{focused ? icons[name]?.active : icons[name]?.inactive}</Text>
    </View>
  );
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: '#ffffff',
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页', headerShown: false }} />
      <Tab.Screen name="People" component={PeopleScreen} options={{ title: '团队', headerShown: false }} />
      <Tab.Screen name="Publications" component={PublicationsScreen} options={{ title: '论文', headerShown: false }} />
      <Tab.Screen name="Research" component={ResearchScreen} options={{ title: '研究', headerShown: false }} />
      <Tab.Screen name="Industrial" component={IndustrialScreen} options={{ title: '基地', headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen
          name="ResearchDetail"
          component={ResearchDetailScreen}
          options={{
            title: '研究方向详情',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: '#f6f8fb' },
          }}
        />
        <Stack.Screen
          name="IndustrialDetail"
          component={IndustrialDetailScreen}
          options={{
            title: '产业化基地详情',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerTintColor: '#fff',
            contentStyle: { backgroundColor: '#f6f8fb' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    height: Platform.OS === 'ios' ? 85 : 64,
    paddingTop: 6,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  header: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconActive: {
    transform: [{ scale: 1.05 }],
  },
});
