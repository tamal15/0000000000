import {getAuth,signInWithPopup,GoogleAuthProvider,GithubAuthProvider,signOut } from 'firebase/auth';
import './App.css';
import React, { useState } from 'react';
import initializeAuthenticaton from './Firebase/firebase.initialize';

initializeAuthenticaton();
const Googleprovider = new GoogleAuthProvider();
const GitHubprovider = new GithubAuthProvider();

function App() {
  const [user,setUser]= useState({})
  const handleGoogle=()=>{
     const auth= getAuth();
     signInWithPopup(auth,Googleprovider)
     .then(result =>{
       const {email,displayName,photoURL}=result.user;
       const logedIn={
         email:email,
         name:displayName,
         photo:photoURL
       }
       setUser(logedIn)
       console.log(logedIn)
     });
  }

  const handleGitHub=()=>{
    const auth = getAuth();
     signInWithPopup(auth, GitHubprovider)
     .then(result =>{
       const user=result.user;
       console.log(user)
     })
  }

  const handleLogout =()=>{
    const auth = getAuth();
    signOut(auth)
    .then(()=>{
      setUser({})
    })
  }
  return (
    <div className="App">
     {!user.name?
      <div>
          <button onClick={handleGoogle}>Google sign in</button>
        <button onClick={handleGitHub}>GitHub sign in</button>
      </div>:
        <button onClick={handleLogout}>LogOut</button>
     }
     {
      user.email&&
        <div>
           <h3>email: {user.email}</h3>
           <h4>{user.name}</h4>
           <img src={user.photo} alt="" />
        </div>
      
     }
     
    </div>
  );
}

export default App;
