import { useEffect, useState } from 'react';
import LoginPage from './pages/Login';

function App() {

  const [auth, setAuth] = useState<null | boolean>(null);

  useEffect(() => {
    setAuth((localStorage.getItem('auth') !== null))
  }, [])

  if(auth === false) {
    return (
      <LoginPage />
    )
  }

  else if(auth) {
    return (
      <>
        Logged In
      </>
    )
  }

  else {
    return (
      <>
      </>
    )
  }
  
}

export default App;
