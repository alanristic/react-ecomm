/**
 * Interface btw Firebase and our own app
 */
import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithRedirect, // Google's redirect sign-in
  signInWithPopup, // Google's popup sign-in
  GoogleAuthProvider, // specific provider (Google)
  createUserWithEmailAndPassword, // email/password sign-in (provider is not needed since it's considered 'native' provider)
} from "firebase/auth"

import {
  getFirestore,
  doc, // create a reference to a document instance
  getDoc, // set data
  setDoc, // get data
} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPoBGhLQaazQUEDRX5PFG1HgcDIcJ4NpI",
  authDomain: "ud-react-ecomm.firebaseapp.com",
  projectId: "ud-react-ecomm",
  storageBucket: "ud-react-ecomm.firebasestorage.app",
  messagingSenderId: "801889156256",
  appId: "1:801889156256:web:f5f4fcbfeee4179d07ddc5",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig) // just one type of provider (Google) for now

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  // instruct Google to always trigger the account selection prompt
  prompt: "select_account",
})

export const auth = getAuth() // it's sigle instance of the auth service (we ever only need one even with multiple providers)

/**************
 * PROVIDERS
 **************/
export const signInWithGooglePopup = () => signInWithPopup(auth, provider) // popup sign-in with Google
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider) // redirect sign-in with Google

// Let's instantinate Firestore
const db = getFirestore()

// Let's create a function to create a user profile document when a user signs in with Google
export const createUserProfileDocument = async (userAuth, additionalData) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  //   console.log(userDocRef)

  const userDocSnapshot = await getDoc(userDocRef)
  //   console.log(userDocSnapshot)
  //   console.log(userDocSnapshot.exists())

  // If user doesn't exist in the database, create a new user document
  if (!userDocSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.error("Error creating user", error.message)
    }
  }

  // if user exists, return the user document reference
  return userDocRef
}

/**
 * Creates a new user with email and password
 *
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @returns {Promise<void>} - A promise that resolves when the user is created
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    // if email or password are missing, log an error and return
    console.error("Email and password are required")
    return
  }

  try {
    // console.log("createAuthUserWithEmailAndPassword: " + email, password)
    // return
    return await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in with email and password", error.message)
  }
}
