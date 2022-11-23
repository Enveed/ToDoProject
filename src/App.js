/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from "native-base";
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Stack = createStackNavigator();

const App = () => {
  const { isLoggedIn, setIsLoggedIn } = useState(false);


  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {
            !isLoggedIn ? (
              <Stack.Screen name="Login" getLoginStatus={isLoggedIn} setLoginStatus={setIsLoggedIn} component={Login} />
            ) : (<Stack.Screen name="Home" component={Home} />)
          }
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


export default App;
