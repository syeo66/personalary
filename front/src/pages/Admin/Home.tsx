import React from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <>
      <h2>Personalary Admin Interface</h2>
      <p>Here you can customize your smart picture frame.</p>

      <ul>
        <li>
          <Link to="scenes">Scenes</Link>: Manage your scenes.
        </li>
      </ul>

      <hr />

      <ul>
        <li>
          <Link to="clock">Clock</Link>: Set the clock style.
        </li>
        <li>
          <Link to="background">Background</Link>: Set the background image provider.
        </li>
        <li>
          <Link to="messages">Messages</Link>: Set the message source.
        </li>
        <li>
          <Link to="musicplayer">Music Player</Link>: Set the music players source.
        </li>
      </ul>
    </>
  )
}

export default Home
