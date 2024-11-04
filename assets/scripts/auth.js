import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyDGrgHBqst4kHPFyXeXQQiZfF00dsArs5s",
    authDomain: "revou-space.firebaseapp.com",
    projectId: "revou-space",
    storageBucket: "revou-space.firebasestorage.app",
    messagingSenderId: "860645925304",
    appId: "1:860645925304:web:06a4e360b9964c259d6f4d",
    measurementId: "G-HMRV01Q8D5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
provider.setCustomParameters({
    'login_hint': 'user@example.com'
});

const signedInView = document.querySelector('#sign-in-result');
const signInButton = document.querySelector('#google-sign-in');
signInButton.addEventListener('click', () => doSignIn());

const signOutButton = document.querySelector('#signout');
signOutButton.addEventListener('click', () => doSignOut());

function doSignIn() {
    signInWithPopup(auth, provider).catch((error) => {
      console.warn({error})
      const errorMessage = error.message;
      signedInView.textContent = `Sign-in error: ${errorMessage}`;
    });
}

function doSignOut() {
    signOut(auth).catch((error) => {
        console.warn({error})
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
      signedInView.textContent = `Welcome, ${user.displayName}!`;
      signInButton.classList.add('hidden');
    } else {
        signedInView.textContent = '';
        signInButton.classList.remove('hidden');
    }
  });