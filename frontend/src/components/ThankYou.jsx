import { useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"

const ThankYou = () => {
  const { clearCart } = useCart()
  const navigate = useNavigate()

  const goToHome = () => {
    clearCart()
    navigate("/")
  }

  return (
    <div>
      <h2>Thank You for Your Purchase!</h2>
      <p>Your payment was successful.</p>
      <button onClick={goToHome} className="btn">Continue shopping</button>
    </div>
  )
}

export default ThankYou
