import React from 'react'
import './login.css'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import logo from './logo.png'

const Login = () => {
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [profilePic, setProfilePic] = React.useState('')
  const [password, setPassword] = React.useState('')

  const dispatch = useDispatch()

  const loginToApp = (e) => {
    e.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            profileUrl: userAuth.user.photoUrl,
          })
        )
      })
      .catch((error) => alert(error))
  }
  const register = () => {
    if (!name) {
      return alert('please enter your name')
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            )
          })
      })
      .catch((error) => alert(error))
  }
  return (
    <div className='login'>
      <h1>You are not logged in </h1>
      <img src={logo} alt='nolog' />
      <form onSubmit={loginToApp}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Full Name'
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          type='text'
          placeholder='Profile pic url'
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Email'
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
        <button type='submit'>Sign In</button>
      </form>

      <p>
        Not a member?
        <span onClick={register} className='login__register'>
          Register now
        </span>
      </p>
    </div>
  )
}

export default Login
