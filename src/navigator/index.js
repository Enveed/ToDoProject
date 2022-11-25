import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import { useSelector } from 'react-redux';
import Home from '../screens/Home';
import Login from '../screens/Login';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const { isLoggedIn } = useSelector(state => state.operationReducer);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {
                    !isLoggedIn ? (
                        <Stack.Screen name="Login" component={Login} />
                    ) : (<Stack.Screen name="Home" component={Home} />)
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
