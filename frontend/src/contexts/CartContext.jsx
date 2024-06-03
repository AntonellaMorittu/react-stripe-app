import { createContext, useContext, useState } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartItemCount, setCartItemCount] = useState(0)

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id)

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart]

      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      }

      setCart(updatedCart)
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }

    setCartItemCount(cartItemCount + 1)
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0)

    setCart(updatedCart)
  }

  const clearCart = () => {
    setCart([])
    setCartItemCount(0)
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, cartItemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
