import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './src/navigation/AppStack';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import { requestLocationPermission } from './src/network/services';

const App = () => {
  requestLocationPermission()
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
