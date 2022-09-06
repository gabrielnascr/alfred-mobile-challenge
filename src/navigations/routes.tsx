import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesContainer } from '../screens/Favorites';
import { HomeContainer } from '../screens/Home';

import HomeIcon from '../assets/icons/home-icon.svg';
import HeartIcon from '../assets/icons/heart-icon.svg';
import colors from '../global/styles/colors';
import { TabBar } from '../components';

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            backgroundColor: colors.blue_300,
            padding: 15,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBar icon={HomeIcon} title="Inicio" focused={focused} />
            ),
          }}
          component={HomeContainer}
        />
        <Tab.Screen
          name="Favorites"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabBar icon={HeartIcon} title="Favoritos" focused={focused} />
            ),
          }}
          component={FavoritesContainer}
        />
      </Tab.Navigator>
    </>
  );
}
