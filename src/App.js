/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NativeBaseProvider } from 'native-base';
import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import reducers from './redux/reducers';
import rootSaga from './redux/sagas';
import { Provider } from 'react-redux';
import AppNavigator from './navigator';


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  );
}


export default App;
