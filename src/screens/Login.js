import { Box, Center, Pressable, Text, View } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native';

const Login = (props) => {
    const window = useWindowDimensions();
    const { getLoginStatus, setLoginStatus } = props;
    const onPressHandler = () => {
        setLoginStatus(true);
    };
    return (
        <Center bg="blue.600" height={window.height} width={window.width} >
            Login
            <Pressable onPress={onPressHandler}>
                {({
                    isPressed,
                }) => {
                    return (
                        <Box bg={isPressed ? 'amber.900' : 'emerald.800'} my="10" paddingY="5" paddingX="10" borderWidth="1" borderRadius="15"
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
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
