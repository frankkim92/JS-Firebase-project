// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
    apiKey: "AIzaSyAkfv74rA_Iz1wyJJhJ9o3FGYWbhFsEkuU",
    authDomain: "soroksorok-127eb.firebaseapp.com",
    projectId: "soroksorok-127eb",
    storageBucket: "soroksorok-127eb.appspot.com",
    messagingSenderId: "527587561315",
    appId: "1:527587561315:web:96ae57d9aeb8cb2e924d56"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
