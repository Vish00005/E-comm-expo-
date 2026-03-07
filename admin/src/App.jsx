
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import { Link } from 'react-router-dom'

function App() {
  return (
    <>
    <div>
      <h1 style={{display:"inline-block"}}>Welcome</h1>
        <Show when="signed-out">
          <SignInButton mode='modal'/>
          <SignUpButton mode='modal'/>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
      <Link to="/home">Home</Link>
    </>
  )
}

export default App