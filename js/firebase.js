// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyBQQmuB6q3heyHSZKycrkOqCZYlJH5W1FQ",
  authDomain: "colors-project-6a257.firebaseapp.com",
  projectId: "colors-project-6a257",
  storageBucket: "colors-project-6a257.appspot.com",
  messagingSenderId: "710482650303",
  appId: "1:710482650303:web:a8555c9af1d6e13b48120a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
