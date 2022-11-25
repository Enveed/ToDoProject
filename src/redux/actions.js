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

export const getTasks = () => {
    return ({
        type: 'get_tasks_requested',
    });
};

export const deleteTask = (id) => {
    return ({
        type: 'delete_task_requested',
        id,
    });
};
