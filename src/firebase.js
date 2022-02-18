// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA0uuXP0eAwzFGuZvcgt2lLyi_LQetTErk',
    authDomain: 'linkedin-clone-c3244.firebaseapp.com',
    projectId: 'linkedin-clone-c3244',
    storageBucket: 'linkedin-clone-c3244.appspot.com',
    messagingSenderId: '452152099341',
    appId: '1:452152099341:web:423e17616598aa49028b44',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
