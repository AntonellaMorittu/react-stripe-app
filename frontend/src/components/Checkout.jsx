import { useState } from "react"
import { useCart } from "../contexts/CartContext"
import CheckoutForm from "./CheckoutForm"

const Checkout = () => {
  const { cart } = useCart()
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)

  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true)
  }

  return (
    <div>
      <h2>Checkout</h2>
      {paymentSuccessful ? (
        <p>Loading...</p>
      ) : (
        <CheckoutForm
          amount={totalPrice}
          cartItems={cart}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}

export default Checkout
