import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDCVKStAkGZalm_3vQy_GNjnGEJk9ZOw8g",
  authDomain: "netflix-clone-7e576.firebaseapp.com",
  projectId: "netflix-clone-7e576",
  storageBucket: "netflix-clone-7e576.appspot.com",
  messagingSenderId: "1008447749646",
  appId: "1:1008447749646:web:0c0502cb50c69bf47cc65f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    }catch(error){
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password)
    }catch(error){
        console.log(error,"this is the error")
        toast.error(error.code.split('/')[1].split('-').join(" "))
    }
}

const logout = async()=>{
    signOut(auth)
}

export {auth , db , login , signup , logout}