import { Box, Center, Pressable, Text, Image } from 'native-base';
import React from 'react';
import { useWindowDimensions, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const Login = ({ navigator }) => {
    GoogleSignin.configure({
        webClientId:
            '236694834996-9nevhfh11qifluvi07hivscksj86iepr.apps.googleusercontent.com',
    });
    const window = useWindowDimensions();
    const dispatch = useDispatch();
    const onPressHandler = () => {
        try {
            const payload = {
                name: 'Enveed',
                userId: 'username',
            };
            dispatch(loginUser(payload));
        } catch (err) {
            console.log(err);
        }
    };
    const googleSignin = async () => {
        try {
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
            auth().signInWithCredential(googleCredential);
            const payload = {
                name: userInfo.user.name,
                userId: userInfo.user.id,
            };
            dispatch(loginUser(payload));
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
    };

    return (
        <Center bg="blue.600" height={window.height} width={window.width} >
            <TouchableOpacity onPress={googleSignin} >
                <Image
                    source={require('../assets/icons/google-icon.png')}
                    alt="logo"
                    size={60}
                />
            </TouchableOpacity>
            Login
            <Pressable onPress={onPressHandler}>
                {({
                    isPressed,
                }) => {
                    return (
                        <Box bg={isPressed ? 'amber.900' : 'emerald.800'} my="10" paddingY="5" paddingX="10" borderWidth="1" borderRadius="15"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1,
                                }],
                            }}>
                            <Text>Login</Text>
                        </Box>);
                }}

            </Pressable>

        </Center >
    );
};

export default Login;
