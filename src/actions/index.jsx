import { auth, provider, storage } from '../firebase';
import db from '../firebase';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { SET_USER, SET_LOADING_STATUS, GET_ARTICLES } from './actionType';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {
    collection,
    addDoc,
    query,
    onSnapshot,
    orderBy,
} from 'firebase/firestore';

const setUser = (payload) => {
    return {
        type: SET_USER,
        user: payload,
    };
};

const setLoading = (status) => ({
    type: SET_LOADING_STATUS,
    status: status,
});

const getArticles = (payload) => ({
    type: GET_ARTICLES,
    payload: payload,
});

const signInApi = () => {
    return (dispatch) => {
        signInWithPopup(auth, provider)
            .then((payload) => {
                dispatch(setUser(payload.user));
            })
            .catch((error) => {
                alert(error.message);
            });
    };
};

const getUserAuth = () => {
    return (dispatch) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                dispatch(setUser(user));
            }
        });
    };
};
const signOutApi = () => {
    return (dispatch) => {
        signOut(auth)
            .then(() => {
                dispatch(setUser(null));
            })
            .catch((error) => {
                alert(error.message);
            });
    };
};
const postArticleAPI = (payload) => {
    return async (dispatch) => {
        dispatch(setLoading(true));

        if (payload.image !== '') {
            const storageRef = ref(storage, `images/${payload.image.name}`);
            const snap = uploadBytesResumable(storageRef, payload.image);

            snap.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}%`);
                    if (snapshot.state === 'RUNNING') {
                        console.log(`Progress: ${progress}%`);
                    }
                },
                (error) => console.log(error.code),
                async () => {
                    const downloadURL = await getDownloadURL(
                        ref(storage, (await snap).ref.fullPath)
                    );
                    await addDoc(collection(db, 'articles'), {
                        actor: {
                            description: payload.user.email || null,
                            title: payload.user.displayName || null,
                            date: payload.timestamp || null,
                            image: payload.user.photoURL || null,
                        },
                        video: payload.video || null,
                        sharedImg: downloadURL,
                        comments: 0 || 0,
                        description: payload.description || null,
                    });
                    dispatch(setLoading(false));
                }
            );
        } else if (payload.video) {
            await addDoc(collection(db, 'articles'), {
                actor: {
                    description: payload.user.email || null,
                    title: payload.user.displayName || null,
                    date: payload.timestamp || null,
                    image: payload.user.photoURL || null,
                },
                video: payload.video || null,
                sharedImg: '',
                comments: 0 || 0,
                description: payload.description || null,
            });
            dispatch(setLoading(false));
        }
    };
};

const getArticlesAPI = () => {
    return (dispatch) => {
        let payload;

        const o = query(
            collection(db, 'articles'),
            orderBy('actor.date', 'desc')
        );
        onSnapshot(o, (snapshot) => {
            payload = snapshot.docs.map((doc) => doc.data());
            dispatch(getArticles(payload));
        });
    };
};

export {
    signInApi,
    getUserAuth,
    signOutApi,
    postArticleAPI,
    setLoading,
    getArticlesAPI,
};
