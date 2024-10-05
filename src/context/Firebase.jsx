import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, child } from "firebase/database"; // Import get and child
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC_ZmMkUB9f4bEX6pUSHpDeTAcRjFVYVvE",
    authDomain: "learn-firebase-1f7d0.firebaseapp.com",
    databaseURL: "https://learn-firebase-1f7d0-default-rtdb.firebaseio.com",
    projectId: "learn-firebase-1f7d0",
    storageBucket: "learn-firebase-1f7d0.appspot.com",
    messagingSenderId: "257784656220",
    appId: "1:257784656220:web:571d6a9c5ec2dd98cc1199",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
        throw new Error('useFirebase must be used within a FirebaseProvider');
    }
    return context;
};

export const FirebaseProvider = (props) => {
    const putData = (key, data) => {
        set(ref(database, key), data);
    };

    // Add your uploadFile function here if you have one
    const uploadFile = async (file) => {
        const storage = getStorage();
        const fileRef = storageRef(storage, `resumes/${file.name}`); // Create a reference to the file

        await uploadBytes(fileRef, file); // Upload the file

        // Get the file's download URL
        const url = await getDownloadURL(fileRef);
        return url; // Return the URL of the uploaded file
    };

    const fetchData = async (path) => {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, path));
        if (snapshot.exists()) {
            return snapshot.val(); // Return the data
        } else {
            console.log("No data available");
            return null;
        }
    };

    return (
        <FirebaseContext.Provider value={{ putData, uploadFile, fetchData }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};
