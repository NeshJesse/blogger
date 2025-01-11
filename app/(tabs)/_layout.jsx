import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from './home';
import PostDetails from '../postdetails'; // Ensure correct path
import TwoScreen from './two'; // Example second tab

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Nested Stack Navigator for the Home Tab
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false, title: 'Home' }} />
      <Stack.Screen name="PostDetails" component={PostDetails} options={{ title: 'Post Details' }} />
    </Stack.Navigator>
  );
}

// Main Layout with Bottom Tab Navigation
export default function Layout() {
  return (
   
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home-outline'; // Icon for the Home tab
          } else if (route.name === 'Two') {
            iconName = 'settings-outline'; // Icon for the Two tab
          }

          // Return the icon component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato', // Active tab color
        tabBarInactiveTintColor: 'gray', // Inactive tab color
      })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="Two" component={TwoScreen} options={{ title: 'Two' }} />
      </Tab.Navigator>
 
  );
}

