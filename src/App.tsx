import { useEffect, useState } from 'react';
import LeadsPage from './pages/Leads';
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
      <LeadsPage />
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
