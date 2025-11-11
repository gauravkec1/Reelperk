/**
 * Web-specific App wrapper
 * Production-ready version
 */

import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, Platform, View, Text, StyleSheet} from 'react-native';

import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import {ErrorBoundary} from './src/components/common/ErrorBoundary';

// Web-specific styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow: hidden;
    }
    #root {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `;
  if (!document.head.querySelector('style[data-reelperk]')) {
    style.setAttribute('data-reelperk', 'true');
    document.head.appendChild(style);
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <AppNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
