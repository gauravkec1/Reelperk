import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StatusBar} from 'react-native';

import {store} from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import {ErrorBoundary} from './src/components/common/ErrorBoundary';

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

