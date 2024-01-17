import { useState } from 'react';
import { assets } from '../assets';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-toastify';

function SignIn() {

  const [ showPassword, setShowPassword ] = useState(false);

  const [ formData, setFormData ] = useState({
    email: "",
    password: "",
  }); 

  const { email, password } = formData;

  const navigate = useNavigate();

  function onChange(e){
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e){
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if(userCredential.user){
        navigate("/farmer-profil")
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }

  return (
    <section className='bg-primary '>
      <div className='flex justify-around items-center py-4 mb-8'>
        <h2 className='font-body text-5xl font-semibold p-4 text-font-light'>Sign <br/>In</h2>
        <img 
          className='w-[10rem] drop-shadow-md'
          src={assets.fruit_basket} 
          alt="palma verde fruit basket" />
      </div>

      <div className='bg-font-light rounded-t-[1.85rem] flex flex-col justify-center items-center px-6 py-12'>
        <div className='w-full md:w-[70%] lg:w-[40%] lg:ml-20 '>
          <form onSubmit={onSubmit}>
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
                className='font-body text-sm w-full px-4 py-2 text-font-middle rounded-3xl bg-[#F9F5F1] transition ease-in-out mb-6 focus:border-[#FEFDFC]'
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
            <button type='submit' className='btn-peach mb-2'>Sign In</button>
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
            <div className='flex gap-12 justify-center py-4'>
              <OAuth/>
              <OAuth/>
              <OAuth/>
            </div>

            <div className='mt-6'>
              <p className='text-left text-sm text-font-middle'>Don't have a account?
                <Link to="/sign-up"> <span className='font-bold'>Sign Up</span></Link>
              </p>
            </div>
          </form>
          
        </div>
      </div>
    </section>
  )
}

export default SignIn