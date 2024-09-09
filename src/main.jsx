import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <Auth0Provider
     domain="dev-zrgmfj0gfrzzyd14.us.auth0.com"
     clientId="sBrugGFLmkyUaDz8o83P7bpqsb1pR7as"
     authorizationParams={{
       redirect_uri: window.location.origin
     }}
    
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
