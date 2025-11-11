/**
 * Main App Navigator
 * Handles authentication flow and main app navigation
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const AppNavigator: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;

