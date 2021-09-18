import React from 'react'
import './feed.css'
import InputOption from './InputOption'
import CreateIcon from '@material-ui/icons/Create'
import ImageIcon from '@material-ui/icons/Image'
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay'
import EventNoteIcon from '@material-ui/icons/EventNote'
import Post from './Post'
import SubscriptionsIcon from '@material-ui/icons/Subscriptions'
import { db } from './firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import FlipMove from 'react-flip-move'

const Feed = () => {
  const [input, setInput] = React.useState('')
  const [posts, setPosts] = React.useState([])

  const user = useSelector(selectUser)

  React.useEffect(() => {
    db.collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      )
    console.log(posts)
    //eslint-disable-next-line
  }, [])

  const sendPost = (e) => {
    e.preventDefault()

    db.collection('posts').add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || '',
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }

  return (
    <div className='feed'>
      <div className='feed__inputContainer'>
        <div className='feed__input'>
          <CreateIcon />
          <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={sendPost} type='submit'>
              Send
            </button>
          </form>
        </div>

        <div className='feed__inputOptions'>
          <InputOption Icon={ImageIcon} title='Photo' color='cornflowerblue' />
          <InputOption
            Icon={SubscriptionsIcon}
            title='Video'
            color='cornflowerblue'
          />
          <InputOption
            Icon={EventNoteIcon}
            title='Event'
            color='cornflowerblue'
          />
          <InputOption
            Icon={CalendarViewDayIcon}
            title='Write article'
            color='cornflowerblue'
          />
        </div>

        {/* POSTS */}
        <FlipMove>
          {posts.map(({ id, data: { name, description, message } }) => (
            <Post
              key={id}
              name={name}
              description={description}
              message={message}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  )
}

export default Feed
