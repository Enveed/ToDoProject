import { takeLatest, put, all, actionChannel, select } from 'redux-saga/effects';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

function* handleLogin({ payload }) {
    try {
        yield put({ type: 'login_success', payload });
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

function* handleGetTasks({ userId }) {
    console.log(userId);
    try {
        const res = [];
        yield firestore()
            .collection(userId)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(documentSnapshot => {
                    res.push({
                        title: documentSnapshot.data().title,
                        id: documentSnapshot.id,
                    });
                });
            });
        yield put({ type: 'get_tasks_success', userId, tasks: res });
    } catch (err) {
        yield put({ type: 'get_tasks_failed', error: err.message });
    }
}

function* handleDeleteTask({ payload }) {
    try {
        yield put({ type: 'delete_task_success', payload });
    } catch (err) {
        yield put({ type: 'delete_task_failed', error: err.message });
    }
}

function* handleAddTask({ payload }) {
    try {
        const { operationReducer } = yield select(state => state);
        const { userId, task } = payload;
        const docId = yield firestore()
            .collection(userId)
            .add({
                title: task,
            })
            .then((docRef) => {
                return docRef.id;
            })
            .catch((err) => {
                console.log(err);
            });
        const modPayload = {
            task, tasks: [...operationReducer.tasks, {
                title: task,
                id: docId,
            }], userId,
        }
        yield put({
            type: 'add_task_success', modPayload
        });
    } catch (err) {
        yield put({ type: 'add_task_failed', error: err.message });
    }
}

function* watcherSaga() {
    yield takeLatest('login_requested', handleLogin);
    yield takeLatest('logout_requested', handleLogout);
    yield takeLatest('get_tasks_requested', handleGetTasks);
    yield takeLatest('delete_task_requested', handleDeleteTask);
    yield takeLatest('add_task_requested', handleAddTask);
}

export default function* rootSaga() {
    yield all([watcherSaga()]);
}
