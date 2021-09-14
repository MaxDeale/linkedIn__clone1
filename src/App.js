import './App.css'
import Header from './Header'
import Feed from './Feed'
import React from 'react'
import Sidebar from './Sidebar'
import { selectUser, login, logout } from './features/userSlice'
import { useSelector } from 'react-redux'
import Login from './Login'
import { auth } from './firebase'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  React.useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //user logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayname,
            photoUrl: userAuth.photoUrl,
          })
        )
      } else {
        //user not logged in
        dispatch(logout())
      }
    })
    //eslint-disable-next-line
  }, [])

  const user = useSelector(selectUser)
  return (
    <div className='app'>
      {/* HEADER */}
      <Header />
      {!user ? (
        <Login />
      ) : (
        <div className='app__body'>
          {/* SIDEBAR */}
          <Sidebar />
          {/* FEED */}
          <Feed />
          {/* WIDGETS */}
        </div>
      )}
    </div>
  )
}

export default App
