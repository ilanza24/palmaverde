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

function Home() {

  const [ showPassword, setShowPassword ] = useState(false);

  const [ formData, setFormData ] = useState({
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
      navigate("/upload-product");
    } catch (error) {
      toast.error("Something went wrong with the registration");
    }
  }

  return (
    <section className='bg-background w-full p-6 text-font'>
      <h1 className='font-body text-3xl font-normal leading-relaxed'>Welcome to <br/><span className='font-bold font-title text-4xl'>Palma Verde</span></h1>
      <div className='flex justify-center flex-wrap items-center  max-w-6xl mx-auto'>
        <div className='md:w-[70%] lg:w-[50%] mb-6'>
          <img 
            src={assets.home_market} alt="home" 
            className='w-full'
          />
          <p className='text-center font-body text-xl leading-7 py-2'>
            Shop for organic produce <br/>straight from the farm!
          </p>
          <p className='font-semibold font-body text-sm cursor-pointer pt-2 text-center'>
            <Link to="/sign-up">Continue as a farmer</Link>
          </p>
        </div>

        <div className='w-full md:w-[70%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>

            <input 
              className='font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#FEFDFC] transition ease-in-out mb-6 focus:border-[#FEFDFC]'
              type="email" 
              id='email' 
              value={email}
              onChange={onChange}
              placeholder='email'
            />

            <div className='relative mb-6'>
              <input 
                className='font-body text-sm w-full px-4 py-2 text-font-middle bg-[#FEFDFC] focus:border-[#FEFDFC] rounded-3xl transition ease-in-out'
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
            <div>
               <button type='submit' className='btn-peach mb-2'>Log in</button>
            </div>
           <div>
            <p className='text-right text-sm text-font-middle py-2'>
                <Link 
                  className='cursor-pointer'
                  to="/forgot-password">Forgot password?
                </Link>
              </p>
           </div>

           <div className='my-4 flex items-center 
                  before:border-t 
                  before:flex-1 
                  before:text-font-middle
                  after:border-t
                  after:flex-1
                  after:text-font-middle'>
              <p className='text-sm text-center mx-4 text-font-middle'>or sign in with</p>
            </div>
            <div className='flex gap-12 justify-center'>
              <OAuth/>
              <OAuth/>
              <OAuth/>
            </div>
            <div className='mt-6'>
              <p className='text-left text-sm text-font-middle'>Have a account?
                <Link to="/sign-up"> <span className='font-bold'>Sign Up</span></Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Home