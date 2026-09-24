
import {
  createContext,
  type ReactNode,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

import { type ProductProps } from '../pages/home'

interface CartContextData {
  cart: CartProps[]
  cartAmount: number
  addItemCart: (newItem: ProductProps) => void
  removeItemCart: (product: CartProps) => void
  total: string
  compraRealizada: boolean
  setCompraRealizada: Dispatch<SetStateAction<boolean>>
}

interface CartProps {
  id: string
  title: string
  description: string
  price: number
  cover: string
  amount: number
  total: number
}

interface CartProviderProps {
  children: ReactNode
}

export const CartContext = createContext({} as CartContextData)

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProps[]>([])
  const [total, setTotal] = useState('')
  const [compraRealizada, setCompraRealizada] = useState(false)

  function addItemCart(newItem: ProductProps) {
    const indexItem = cart.findIndex(item => item.id === newItem.id)

    if (indexItem !== -1) {
      const cartList = [...cart]

      cartList[indexItem].amount = cartList[indexItem].amount + 1
      cartList[indexItem].total =
        cartList[indexItem].amount * cartList[indexItem].price

      setCart(cartList)
      totalResultCart(cartList)

      return
    }

    const data = {
      ...newItem,
      amount: 1,
      total: newItem.price,
    }

    const newCart = [...cart, data]

    setCart(newCart)
    totalResultCart(newCart)
  }

  function removeItemCart(product: CartProps) {
    const indexItem = cart.findIndex(item => item.id === product.id)

    if (cart[indexItem]?.amount > 1) {
      const cartList = [...cart]

      cartList[indexItem].amount = cartList[indexItem].amount - 1
      cartList[indexItem].total =
        cartList[indexItem].total - cartList[indexItem].price

      setCart(cartList)
      totalResultCart(cartList)

      return
    }

    const removeItem = cart.filter(item => item.id !== product.id)

    setCart(removeItem)
    totalResultCart(removeItem)
  }

  function totalResultCart(items: CartProps[]) {
    const result = items.reduce((acc, obj) => {
      return acc + obj.total
    }, 0)

    const resultFormated = result.toLocaleString('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    })

    setTotal(resultFormated)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartAmount: cart.length,
        addItemCart,
        removeItemCart,
        total,
        compraRealizada,
        setCompraRealizada,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider