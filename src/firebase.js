import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDvEP6GHH1a1xpfudulz2gNP3mmv6CGi3s",
    authDomain: "propease-854ff.firebaseapp.com",
    projectId: "propease-854ff",
    storageBucket: "propease-854ff.appspot.com",
    messagingSenderId: "1039108481441",
    appId: "1:1039108481441:web:48ec9da124d35ddc9debe0"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;