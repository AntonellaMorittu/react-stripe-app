import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import "./CheckoutForm.css"
import ThankYou from "./ThankYou"

const CheckoutForm = ({ amount, cartItems }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentStatus, setPaymentStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded yet.")
      return
    }

    const cardElement = elements.getElement(CardElement)
    setIsLoading(true)

    try {
      const response = await fetch(
        "http://localhost:8080/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: amount * 100, // Convert price to cents
            cartItems: cartItems,
          }),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Response from server:", data)

      const { clientSecret } = data

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      })

      if (result.error) {
        console.error(result.error.message)
        setPaymentStatus(result.error.message)
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!")
          setPaymentStatus("Payment successful!")
          setShowThankYou(true)
        } else {
          console.error(
            "Unexpected payment status:",
            result.paymentIntent.status
          )
          setPaymentStatus(
            `Unexpected payment status: ${result.paymentIntent.status}`
          )
        }
      }
    } catch (error) {
      console.error("Error during payment:", error)
      setPaymentStatus(`Error: ${error.message}`)
    }

    setIsLoading(false)
  }

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  return (
    <div>
      {!showThankYou ? (
        <form onSubmit={handleSubmit} className="checkout-form">
          <h3>Total to Pay: ${amount.toFixed(2)}</h3>
          <CardElement options={cardElementOptions} />
          <button type="submit" disabled={!stripe || isLoading}>
            {isLoading ? "Processing..." : "Buy Now"}
          </button>

          <div
            className={`payment-status ${
              paymentStatus === "Payment successful!" ? "success" : ""
            }`}
          >
            {paymentStatus}
          </div>
        </form>
      ) : (
        <ThankYou />
      )}
    </div>
  )
}

export default CheckoutForm
