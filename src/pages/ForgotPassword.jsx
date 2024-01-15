import { useState } from 'react';
import { assets } from '../assets';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';


function ForgotPassword() {

  const [ email, setEmail ] = useState("");

  function onChange(e){
    setEmail(e.target.value);
    }

  return (

    <section className='bg-primary-green w-full h-lvh'>
      <h2 className='text-3xl pt-6 font-bold'>Forgot Password</h2>

      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto '>
  
        <div className='md:w-[70%] lg:w-[50%] mb-12 md:mb-6'>
          <img 
            src={assets.home_women} alt="home" 
            className='w-full'
          />
        </div>

        <div className='w-full md:w-[70%] lg:w-[40%] lg:ml-20'>
          <form>
            <input 
              className='w-full px-4 py-2 text-xl text-gray-700 bg-white rounded-3xl border-gray-300 transition ease-in-out mb-6'
              type="email" 
              id='email' 
              value={email}
              onChange={onChange}
              placeholder='email'
            />

          
            <div className='flex justify-center items-center flex-col'>
              <p>Don't have a account?
                <Link to="/sign-up">Register</Link>
              </p>
              <p>
                <Link 
                  className='cursor-pointer'
                  to="/sign-in">Sign In</Link>
              </p>
            </div>
            <button 
              className='w-full font-medium px-7 py-3 rounded-3xl bg-white'
              type='submit'>
                Send Reset Password
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

export default ForgotPassword