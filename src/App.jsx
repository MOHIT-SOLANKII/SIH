import "./App.css";

import { useAuth0 } from "@auth0/auth0-react";

import FormsInput from "./components/FormsInput";



function App() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log(user);

  
  

  return (
    <>
      <div>
        {isAuthenticated ? (
          <div>

           
            
            
            {/* <img src={user.picture} alt={user.name} /> */}
            <span className="font-bold text-3xl">{user.name}</span>
            {/* <p className="mb-5">Your email : {user.email}</p> */}
            <FormsInput />
          </div>

          
        ) : (
          ""
        )}
      </div>
      {isAuthenticated ? "" : <h1>Login/Signup to continue ...</h1>}
      <div className="card">
        {isAuthenticated ? (
          <button onClick={() => logout()} className="bg-red-600">LOGOUT</button>
        ) : (
          <button onClick={() => loginWithRedirect()} className="bg-blue-500">GET STARTED</button>
        )}
        
      </div>
      
    </>
  );
}

export default App;
