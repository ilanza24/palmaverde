import { useState } from 'react';
import { assets } from '../assets';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { 
  doc, 
  serverTimestamp, 
  setDoc 
} from "firebase/firestore";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { db } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignUp() {

  const [ showPassword, setShowPassword ] = useState(false);

  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
  }); 

  const { name, email, password } = formData;

  const navigate = useNavigate();

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      // toast.success("Sign up was succeessfull");
      navigate("/farmer-profil");
    } catch (error) {
      toast.error("Oops... Something went wrong with the registration");
    }
  }

  return (
    <section className='bg-primary-green w-full h-lvh'>
      <h2 className='text-3xl pt-6 font-bold'>Sign Up</h2>

      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
  
        <div className='md:w-[70%] lg:w-[50%] mb-12 md:mb-6'>
          <img 
            src={assets.home_women} alt="home" 
            className='w-full'
          />
        </div>

        <div className='w-full md:w-[70%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
          <input 
              className='w-full px-4 py-2 text-gray-700 bg-white rounded-3xl border-gray-300 transition ease-in-out mb-6'
              type="text" 
              id='name' 
              value={name}
              onChange={onChange}
              placeholder='full name'
            />

            <input 
              className='w-full px-4 py-2 text-gray-700 bg-white rounded-3xl border-gray-300 transition ease-in-out mb-6'
              type="email" 
              id='email' 
              value={email}
              onChange={onChange}
              placeholder='email'
            />

            <div className='relative mb-6'>
              <input 
                className='w-full px-4 py-2 text-gray-700 bg-white rounded-3xl border-gray-300 transition ease-in-out'
                type={showPassword ? "text" : "password"} 
                id='password' 
                value={password}
                onChange={onChange}
                placeholder='password'
              />
              {showPassword ? (
                <FaEyeSlash 
                  className='absolute right-4 top-3 text-xl cursor-pointer' 
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ):(
                <FaEye 
                  className='absolute right-4 top-3 text-xl cursor-pointer' 
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
                {/* hae to change the signin signup section*/}
            <div className='flex justify-center items-center flex-col'>
              <p>Have a account?
                <Link to="/sign-in">Sign In</Link>
              </p>
              <p>
                <Link 
                  className='cursor-pointer'
                  to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <button 
              className='w-full font-medium px-7 py-3 rounded-3xl bg-white'
              type='submit'>
                Sign Up
            </button>
            <div 
              className='my-4 flex items-center 
              before:border-t 
              before:flex-1 
              before:border-gray-300
              after:border-t
              after:flex-1
              after:border-gray-300'>
              <p className='text-sm text-center mx-4'>or sign in with</p>
            </div>
            <OAuth/>
          </form>
          
        </div>
      </div>

    </section>
  )
}

export default SignUp