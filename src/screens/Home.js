import { Box, Button, Center, Flex, Image, Pressable, Text } from 'native-base';
import React, { createRef, useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, getTasks, logoutUser } from '../redux/actions';

const Home = () => {
    const window = useWindowDimensions();
    const { tasks, name, userId } = useSelector(state => state.operationReducer);
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const onPressHandler = () => {
        dispatch(logoutUser());
    };

    const handleDelete = (id) => {
        console.log('delete id ', id);
        const payload = {
            taskId: id,
            userId,
        };
        dispatch(deleteTask(payload));
    };

    const handleAddTask = () => {
        const payload = {
            task,
            userId,
        };
        dispatch(addTask(payload));
    };

    useEffect(() => {
        this.myTextInput = createRef();
        dispatch(getTasks(userId));
    }, []);

    return (
        <Box bg="amber.700" height={window.height} width={window.width}>
            <Text>Welcome {name}!</Text>
            <Text>Your ID is {userId}!</Text>
            {
                tasks ? tasks.map((item) => {
                    return (
                        <Box w={window.width} bg="yellow.500" padding={5}
                            borderRadius={10} key={item.id} marginY={5}>
                            <Flex direction="row" justifyContent="space-between">
                                <Text>{item.title}</Text>
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Image
                                        source={require('../assets/icons/trash-icon.png')}
                                        alt="logo"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </Flex>
                        </Box>
                    );
                }) : <Box />
            }

            <Center>
                <TextInput
                    placeholder="Enter your task"
                    onChangeText={(text) => { setTask(text); }}
                    style={{
                        backgroundColor: 'white',
                        marginTop: 10,
                        width: '75%',
                        borderRadius: 10,
                        color: '#000',
                    }}
                    ref={input => { this.myTextInput = input; }}
                />
                <Button marginTop={5} borderRadius={10} maxW="75%" center
                    onPress={handleAddTask}>Submit Task</Button>
            </Center>

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
                            <Text>Logout</Text>
                        </Box>);
                }}

            </Pressable>
        </Box >
    );
};

export default Home;
