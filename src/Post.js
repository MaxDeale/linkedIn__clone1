import React from 'react'
import './post.css'
import { Avatar } from '@material-ui/core'
import InputOption from './InputOption'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined'

const Post = ({ name, description, message, photoUrl }) => {
  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className='post__info'>
          <h2>{name} </h2>
          <p>{description}</p>
        </div>
      </div>

      <div className='post__body'>
        <p>{message}</p>
      </div>

      <div className='post__buttons'>
        <InputOption Icon={ThumbUpAltOutlinedIcon} title='Like' color='grey' />
        <InputOption Icon={ChatOutlinedIcon} title='Comment' color='orange' />
        <InputOption
          Icon={ShareOutlinedIcon}
          title='Share'
          color='cornflowerblue'
        />
        <InputOption Icon={SendOutlinedIcon} title='Send' color='lightgreen' />
      </div>
    </div>
  )
}

export default Post
