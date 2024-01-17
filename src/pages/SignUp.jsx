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
    adress: "",

  }); 

  const { name, email, password, adress } = formData;

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
    <section className='bg-primary'>
      <div className='flex justify-around items-center py-4 mb-8'>
        <h2 className='font-body text-5xl font-semibold p-4 text-font-light'>Sign <br/>Up</h2>
        <img 
          className='w-[10rem] drop-shadow-md'
          src={assets.fruit_basket} 
          alt="palma verde fruit basket" />
      </div>

      <div className='bg-font-light rounded-t-[1.85rem] px-6 py-12'>
        <div className='w-full md:w-[70%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
          <input 
              className='font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#F9F5F1] transition ease-in-out mb-6 focus:border-[#FEFDFC]'
              type="text" 
              id='name' 
              value={name}
              onChange={onChange}
              placeholder='full name'
            />
            <input 
              className='font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#F9F5F1] transition ease-in-out mb-6 focus:border-[#FEFDFC]'
              type="email" 
              id='email' 
              value={email}
              onChange={onChange}
              placeholder='email'
            />
            <div className='relative mb-6'>
            <input 
              className='font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#F9F5F1] transition ease-in-out focus:border-[#FEFDFC]'
              type={showPassword ? "text" : "password"} 
              id='password' 
              value={password}
              onChange={onChange}
              placeholder='password'
            />
              {showPassword ? (
                <FaEyeSlash 
                  className='absolute right-4 top-2.5 text-xl cursor-pointer text-font' 
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ):(
                <FaEye 
                  className='absolute right-4 top-2.5 text-xl cursor-pointer text-font' 
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <input 
              className='font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#F9F5F1] transition ease-in-out mb-6 focus:border-[#FEFDFC]'
              type="text" 
              id='adress' 
              value={adress}
              onChange={onChange}
              placeholder='adress'
            />
            <button type='submit' className='btn-peach mb-2'>Sign Up</button>

            <div className='my-4 flex items-center 
                  before:border-t 
                  before:flex-1 
                  before:text-font-middle
                  after:border-t
                  after:flex-1
                  after:text-font-middle'>
              <p className='text-sm text-center mx-4 text-font-middle'>or sign in with</p>
            </div>
            <div className='flex gap-12 justify-center py-4'>
              <OAuth/>
              <OAuth/>
              <OAuth/>
            </div>
            <div className='mt-6'>
              <p className='text-left text-sm text-font-middle'>Have a account?
                <Link to="/sign-in"> <span className='font-bold'>Sign In</span></Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SignUp