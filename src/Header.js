import React from 'react'
import logo from './logo.png'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import ChatIcon from '@material-ui/icons/Chat'
import './header.css'
import { logout, selectUser } from './features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from './firebase'
import HeaderOption from './HeaderOption'

const Header = () => {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const logOutOfApp = () => {
    dispatch(logout())
    auth.signOut()
  }

  return (
    <div className='header'>
      <div className='header__left'>
        <img src={logo} alt='' />
        <div className='header__search'>
          {/* icon */}
          <SearchIcon />
          <input placeholder='Search' type='text' />
        </div>
      </div>

      <div className='header__right'>
        <HeaderOption Icon={HomeIcon} title='Home' />
        <HeaderOption Icon={SupervisorAccountIcon} title='My Network' />
        <HeaderOption Icon={BusinessCenterIcon} title='Jobs' />
        <HeaderOption Icon={ChatIcon} title='Messaging' />
        <HeaderOption
          onClick={logOutOfApp}
          Icon={NotificationsIcon}
          title='Notifications'
        />
        <HeaderOption
          onClick={logOutOfApp}
          title={user?.displayName}
          avatar={user?.photoUrl}
        />
      </div>
    </div>
  )
}

export default Header
