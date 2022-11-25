import { takeLatest, put, all } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ActionSheetIOS } from 'react-native';

function* handleLogin({ payload }) {
    try {
        yield put({ type: 'login_success' });
    } catch (err) {
        yield put({ type: 'login_failed', error: err.message });
    }
}

function* handleLogout() {
    try {
        yield put({ type: 'logout_success' });
        if (yield GoogleSignin.isSignedIn()) {
            GoogleSignin.revokeAccess();
        }
    } catch (err) {
        yield put({ type: 'logout_failed', error: err.message });
    }
}

function* handleGetTasks() {
    try {
        const tasks = [{ id: 1, title: 'Wash Dishes' },
        { id: 2, title: 'Do Laundry' },
        { id: 3, title: 'KMS' }];
        yield put({ type: 'get_tasks_success', tasks });
    } catch (err) {
        yield put({ type: 'get_tasks_failed', error: err.message });
    }
}

function* handleDeleteTask({ id }) {
    try {
        yield put({ type: 'delete_task_success', taskToBeDeleted: id });
    } catch (err) {
        yield put({ type: 'delete_task_failed', error: err.message });
    }
}

function* watcherSaga() {
    yield takeLatest('login_requested', handleLogin);
    yield takeLatest('logout_requested', handleLogout);
    yield takeLatest('get_tasks_requested', handleGetTasks);
    yield takeLatest('delete_task_requested', handleDeleteTask);
}

export default function* rootSaga() {
    yield all([watcherSaga()]);
}
