import { useCart } from "../../contexts/CartContext"
import { useNavigate } from "react-router-dom"
import "./Cart.css"

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useCart()
  const navigate = useNavigate()
  const handleIncreaseQuantity = (productId) => {
    addToCart(cart.find((item) => item.id === productId))
  }

  const handleDecreaseQuantity = (productId) => {
    removeFromCart(productId)
  }

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const handlePay = () => {
    navigate("/checkout")
  }

  return (
    <div className="cart" onClick={stopPropagation}>
      <h2 className="title">Shopping Cart</h2>
      {cart.length ? (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p>Price: ${item.price}</p>
              <div className="cart-item-quantity">
                <button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h3>Your cart is empty</h3>
      )}
      {cart.length > 0 && (
        <div className="total">
          Total: ${totalPrice.toFixed(2)} {/* Display total price */}
        </div>
      )}
      <div className="clear-cart">
        {cart.length > 0 && (
          <>
            <button className="btn" onClick={clearCart}>
              Clear Cart
            </button>

            <button onClick={handlePay} className="btn">
              Pay
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
