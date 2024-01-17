import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();

  async function onGoogleClick(){
    try {
      const auth = getAuth();
      const provider = new 
      GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // check for the user 
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/farmer-profil");
    } catch (error) {
      toast.error("Could not authorize with Google");
      
    }
  }
  return (
    <div className="flex justify-center items-center">
        <button 
          type="button"
          onClick={onGoogleClick}
          className="rounded-full drop-shadow-2xl shadow-gray-500/50">
            <FcGoogle size={35} className="mt-2 drop-shadow-sm"/>
        </button>
    </div>
  )
}

export default OAuth