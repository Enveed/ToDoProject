import { Center, View } from 'native-base'
import React from 'react'
import { useWindowDimensions } from 'react-native';

const Home = () => {
    const window = useWindowDimensions();
    return (
        <Center bg="amber.700" height={window.height} width={window.width}>
            Home
        </Center>
    );
};

export default Home;
