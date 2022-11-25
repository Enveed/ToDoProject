import { Box, Flex, Image, Pressable, Text } from 'native-base';
import React, { useEffect } from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, getTasks, logoutUser } from '../redux/actions';

const Home = () => {
    const window = useWindowDimensions();
    const { name, tasks } = useSelector(state => state.operationReducer);
    const dispatch = useDispatch();
    const onPressHandler = () => {
        dispatch(logoutUser());
    };

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
    };

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    return (
        <Box bg="amber.700" height={window.height} width={window.width}>
            <Text>Welcome {name}!</Text>
            {
                tasks ? tasks.map((item, id) => {
                    return (
                        <Box w={window.width} bg="yellow.500" padding={10}
                            borderRadius={10}>
                            <Flex direction="row" justifyContent="space-between">
                                <Text>{item.title}</Text>
                                <TouchableOpacity onPress={handleDelete(id)}>
                                    <Image
                                        source={require('../assets/icons/trash-icon.png')}
                                        alt="logo"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </Flex>
                        </Box>
                    );
                }) : ''
            }
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
                            <Text>Logout</Text>
                        </Box>);
                }}

            </Pressable>
        </Box >
    );
};

export default Home;
