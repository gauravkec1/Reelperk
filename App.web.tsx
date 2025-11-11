/**
 * Web-specific App wrapper
 */

import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar, Platform} from 'react-native';

import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import {ErrorBoundary} from './src/components/common/ErrorBoundary';

// Web-specific styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      overflow: hidden;
    }
    #root {
      width: 100%;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
  `;
  document.head.appendChild(style);
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

