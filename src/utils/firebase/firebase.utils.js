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
  signInWithEmailAndPassword, // email/password sign-in (provider is not needed since it's considered 'native' provider)
  signOut, // sign out (invalidate the token)
  onAuthStateChanged, // listen to auth state changes (sign-in, sign-out) trough Observer pattern
} from "firebase/auth"

import {
  getFirestore,
  doc, // create a reference to a document instance
  getDoc, // set data
  setDoc, // get data
  collection, // create a reference to a collection instance
  writeBatch, // batch writes
  query, // query
  getDocs, // get documents
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

/**************
 * INTERFACE LAYER FUNCTIONS
 **************/

/**
 *
 * @param {*} collectionKey // name of the collection (ie 'Users', 'Categories', 'Products')
 * @param {*} objectsToAdd  // documents we want to add to the collection
 * @returns
 */
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey) // it's created if it doesn't exist
  const batch = writeBatch(db) // batch instance (ie one unit of committed writes)

  objectsToAdd.forEach((obj) => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase()) // create a new document reference
    batch.set(newDocRef, obj) // to the newDocRef, set the obj values
  })

  await batch.commit()
  console.log("batch.commit() done") // this is never reached
}

/**
 * Creates a user profile document in Firestore if it doesn't already exist.
 *
 * NOTE: Function is safe to call multiple times for the same user as it checks
 * if the user already exists in the database.
 *
 * @param {Object} userAuth - The authenticated user object from Firebase Auth.
 * @param {string} userAuth.uid - The unique identifier for the authenticated user.
 * @param {string} userAuth.displayName - The display name of the authenticated user.
 * @param {string} userAuth.email - The email of the authenticated user.
 * @param {Object} [additionalData] - Additional data to store in the user document.
 * @returns {Promise<Object>} - A promise that resolves to the user document reference.
 */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  const userDocRef = doc(db, "users", userAuth.uid)
  //   console.log(userDocRef)

  const userDocSnapshot = await getDoc(userDocRef)

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
 * Fetch categories and documents from Firestore.
 *
 * @returns {Promise<Array>} - A promise that resolves with an array of category documents.
 */
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories")

  const q = query(collectionRef)

  // await Promise.reject("Error fetching categories") // <<< testing error handling

  const querySnapshot = await getDocs(q) // get all documents in the collection

  // Rebuild the data structure to be an object with category names as keys and items(aka products) as values
  return querySnapshot.docs.map((docSnapshot) => {
    return docSnapshot.data()
  })

  // .reduce((acc, docSnapshot) => {
  //   const { title, items } = docSnapshot.data() // destructuring actual data from the document snapshot
  //   acc[title.toLowerCase()] = items // so each catgegory key gets an array of items (ie 'hats': [...], 'jackets': [...])
  //   return acc
  // }, {})

  // return categoryMap
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

/**
 * Signs in a user with email and password using Firebase authentication.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise} - A promise that resolves with the user credentials if successful, or logs an error if not.
 */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    // if email or password are missing, log an error and return
    console.error("Email and password are required")
    return
  }

  try {
    // console.log("createAuthUserWithEmailAndPassword: " + email, password)
    // return
    return await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.error("Error signing in with email and password", error.message)
  }
}

/**
 * Signs out the currently authenticated user.
 *
 * This function attempts to sign out the user using the Firebase authentication service.
 * If an error occurs during the sign-out process, it logs the error message to the console.
 *
 * @async
 * @function signOutUser
 * @returns {Promise<void>} A promise that resolves when the user is signed out.
 */
export const signOutUser = async () => {
  try {
    await signOut(auth) // NOTE: we need to clear auth state in our app
  } catch (error) {
    console.error("Error signing out", error.message)
  }
}

/**
 * Listener for authentication state changes.
 *
 * This function sets up a listener that triggers the provided callback
 * whenever the authentication state changes (e.g., user signs in or out).
 *
 * NOTE: this is a 'subscription' (aka 'constant open listener') to the auth state changes
 *
 * @param {function} callback - The function to be called when the authentication state changes.
 * @returns {function} - The unsubscribe function to stop listening to authentication state changes.
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback)
}
