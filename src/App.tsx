import { useState } from 'react';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  return (
    <>
      <div className="login-main flex w-full h-full">
        <div className="bg-img w-2/5 h-full min-h-full bg-[url('./graphic.png')] bg-center bg-no-repeat bg-cover relative">
        </div>
        <div className="login-sec w-3/5 h-full bg-[#1D203E] flex justify-center">
          <div className="login-container self-center w-3/5 h-4/5 bg-[#2C2F48] flex flex-col items-center justify-around">
            <div className="login-title font-semibold text-slate-200 text-4xl">
              Log In
            </div>
            <div className="login-form flex flex-col gap-5">
              <input 
                type="text"
                placeholder="Username"
                onChange={e => setName(e.target.value)}
                value={name}
              />
              <input 
                type="password"
                placeholder="Password"
                onChange={e => setPass(e.target.value)}
                value={pass}
              />
            </div>
            <div className="login-btn p-5 text-2xl text-indigo-200 rounded-3xl font-semibold cursor-pointer select-none">
              SUBMIT
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
