export const loginUser = (payload) => {
    return ({
        type: 'login_requested',
        payload,
    });
};

export const logoutUser = () => {
    return ({
        type: 'logout_requested',
    });
};

export const getTasks = (userId) => {
    return ({
        type: 'get_tasks_requested',
        userId,
    });
};

export const addTask = (payload) => {
    return ({
        type: 'add_task_requested',
        payload,
    });
};

export const deleteTask = (payload) => {
    return ({
        type: 'delete_task_requested',
        payload,
    });
};
