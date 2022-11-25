import { combineReducers } from 'redux';

const initialState = {
    isLoggedIn: false,
    loading: false,
    error: null,
    name: '',
    provider: null,
    tasks: [],
    taskToBeDeleted: null,
};

function operationReducer(state = initialState, action) {
    switch (action.type) {
        case 'login_requested':
            const { name, provider } = action.payload;
            return { ...state, loading: true, name, provider };
        case 'login_success':
            return { ...state, loading: false, isLoggedIn: true };
        case 'login_failed':
            return {
                ...state, loading: false, name: '',
                provider: null, error: action.error,
            };

        case 'logout_requested':
            return { ...state, loading: true };
        case 'logout_success':
            return { ...state, loading: false, isLoggedIn: false };
        case 'logout_failed':
            return { ...state, loading: false, error: action.error };

        case 'get_tasks_requested':
            return { ...state, loading: true, tasks: action.tasks };
        case 'get_tasks_success':
            return { ...state, tasks: action.tasks, loading: false };
        case 'get_tasks_failed':
            return { ...state, error: action.error, loading: false };

        case 'delete_task_requested':
            return { ...state, loading: true, taskToBeDeleted: action.id };
        case 'delete_task_success':
            const tasks = state.tasks.filter(task => {
                task.id !== state.taskToBeDeleted;
            });
            return { ...state, loading: false, tasks, taskToBeDeleted: null };
        case 'delete_task_failed':
            return { ...state, loading: false, taskToBeDeleted: null };

        default:
            return { state };
    }
}

const reducers = combineReducers({ operationReducer });
export default reducers;
