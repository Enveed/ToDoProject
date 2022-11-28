import { combineReducers } from 'redux';
import firestore from '@react-native-firebase/firestore';

const initialState = {
    isLoggedIn: false,
    loading: false,
    error: null,
    name: '',
    tasks: [],
    userId: null,
    task: '',
};

function operationReducer(state = initialState, action) {
    switch (action.type) {
        case 'login_requested':
            return { ...state, loading: true, payload: action.payload };
        case 'login_success':
            {
                const payload = action.payload;
                return {
                    ...state, loading: false, isLoggedIn: true,
                    name: payload.name, userId: payload.userId,
                };
            }
        case 'login_failed':
            return {
                ...state, loading: false, name: '', error: action.error,
            };

        case 'logout_requested':
            return { ...state, loading: true };
        case 'logout_success':
            return { ...state, loading: false, isLoggedIn: false, name: '', userId: null, tasks: [] };
        case 'logout_failed':
            return { ...state, loading: false, error: action.error };

        case 'get_tasks_requested':
            return { ...state, loading: true, userId: action.userId };
        case 'get_tasks_success': {
            return { ...state, tasks: action.tasks, loading: false };
        }
        case 'get_tasks_failed':
            return { ...state, error: action.error, loading: false };

        case 'delete_task_requested':
            return { ...state, loading: true, payload: action.payload };
        case 'delete_task_success':
            {
                const { taskId, userId } = action.payload;
                const tasks = state.tasks.filter(task => {
                    return task.id !== taskId;
                });
                firestore()
                    .collection(userId)
                    .doc(taskId)
                    .delete()
                    .then(() => {
                        console.log('Task deleted!');
                    });
                return { ...state, loading: false, tasks };
            }
        case 'delete_task_failed':
            return { ...state, loading: false };

        case 'add_task_requested':
            return { ...state, loading: true, payload: action.payload };
        case 'add_task_success':
            {
                return {
                    ...state, loading: false, ...action.modPayload,
                };
            }

        case 'add_task_failed':
            return { ...state, loading: false, error: action.error };


        default:
            return { state };
    }
}

const reducers = combineReducers({ operationReducer });
export default reducers;
