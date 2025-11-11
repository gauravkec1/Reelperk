/**
 * Main Tab Navigator
 * Bottom tab navigation for main app screens
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../config/theme';
import {ROUTES} from '../constants/routes';
import {TabParamList} from './navigationTypes';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import OrdersListScreen from '../screens/orders/OrdersListScreen';
import MenuListScreen from '../screens/menu/MenuListScreen';
import QRCodeScreen from '../screens/qr/QRCodeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}: {route: any}) => ({
        tabBarIcon: ({focused, color, size}: {focused: boolean; color: string; size: number}) => {
          let iconName: string;

          switch (route.name) {
            case ROUTES.DASHBOARD:
              iconName = 'dashboard';
              break;
            case ROUTES.ORDERS:
              iconName = 'receipt';
              break;
            case ROUTES.MENU:
              iconName = 'restaurant-menu';
              break;
            case ROUTES.QR:
              iconName = 'qr-code-scanner';
              break;
            case ROUTES.SETTINGS:
              iconName = 'settings';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name={ROUTES.DASHBOARD}
        component={DashboardScreen}
        options={{title: 'Dashboard'}}
      />
      <Tab.Screen
        name={ROUTES.ORDERS}
        component={OrdersListScreen}
        options={{title: 'Orders'}}
      />
      <Tab.Screen
        name={ROUTES.MENU}
        component={MenuListScreen}
        options={{title: 'Menu'}}
      />
      <Tab.Screen
        name={ROUTES.QR}
        component={QRCodeScreen}
        options={{title: 'QR & Reels'}}
      />
      <Tab.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

