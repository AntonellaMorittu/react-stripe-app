import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import StripeProvider from "./contexts/StripeProvider.jsx"
import { CartProvider } from "./contexts/CartContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StripeProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </StripeProvider>
  </React.StrictMode>
)
