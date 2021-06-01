import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from './Firebase.config';
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export const GoogleLogin = () => {
  let GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth()
    .signInWithPopup(GoogleProvider)
    .then((result) => {
        const {displayName, email} = result.user;
        const signInUserInfo = {name: displayName, email}
        return signInUserInfo;
    }).catch((error) => {
        console.log(error.message)
    });
}

export const fireBaseJWT = () => {
  return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then((idToken) => {
      return idToken;
    }).catch((error) => {
      console.log(error)
    });
}