import { useState, useEffect } from 'react'
import useAuthStore from '../store/useAuthStore'
import { Link } from 'react-router-dom'
import toast from "react-hot-toast"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()
  const {user,login, loading} = useAuthStore()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    if (user) {
      navigate("/homepage");
    }
  }, [user, navigate]);

  const validateForm = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Invalid Email format")
      return false
    }
    if (!formData.password) {
      toast.error("Password is required")
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    login(formData)
  }

  return (
    <div className="hero bg-base-100 h-[calc(100vh-4rem)] w-full">
      <div className="hero-content rounded-2xl backdrop:blur-2xl shadow-2xl bg-base-100 border-1 pt-10 pb-10 border-primary/70 flex-col w-xs md:w-sm">
        <div className="card bg-base-100 w-full max-w-sm shriNnk-0 ">
          <div className='flex flex-col items-center justify-center gap-0.5 '>
           
           <div className='flex flex-col gap-1'> 
            <h1 className='font-semibold text-center text-primary/80 text-xl'>Welcome Back</h1>
            <h3 className='text-center text-base-content/60 text-sm '>Sign in to your Account</h3>
          </div></div>

          <form className="card-body" onSubmit={handleSubmit}>
            <fieldset className="fieldset flex flex-col gap-1">
              <div className='flex flex-col gap-5'>
                <label className="floating-label">
                  <span>Your Email</span>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    className="input input-md  focus:outline-1 focus:outline-primary focus:border-transparent"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </label>

                <label className="floating-label relative">
                  <span>Password</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input input-md  focus:outline-1 focus:outline-primary focus:border-transparent"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute cursor-pointer p-1 right-2 top-[10px] text-base-content/70"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </label>
              </div>

              <div><a className="link link-hover">Forgot password?</a></div>

              <button
                type="submit"
                
                className="btn btn-primary mt-4"
              >
               Login
              </button>
            </fieldset>

            <h1>Don't have an account?
              <Link className='text-primary font-medium' to="/signup">{` Sign up`}</Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
