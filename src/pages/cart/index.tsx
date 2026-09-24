
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { BsCartPlus } from 'react-icons/bs'
import toast from 'react-hot-toast'

import { CartContext } from '../../contexts/CartContex'
import { type ProductProps } from '../home'

export function Cart() {
  const {
    cart,
    total,
    addItemCart,
    removeItemCart,
    compraRealizada,
    setCompraRealizada,
  } = useContext(CartContext)

  function handleAddCartItem(product: ProductProps) {
    toast.success('Produto adicionado no carrinho', {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color: '#FFF',
      },
    })

    addItemCart(product)
  }

  function handleFinalizarCompra() {
    setCompraRealizada(true)

    toast.success('Compra realizada com sucesso!', {
      style: {
        borderRadius: 10,
        backgroundColor: '#121212',
        color: '#FFF',
      },
    })
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      <h1 className="font-medium text-2xl text-center my-4">
        Meu carrinho
      </h1>

      {cart.length === 0 && (
        <div className="flex flex-col items-center justify-center">
          <p className="font-medium">
            Ops seu carrinho está vazio...
          </p>

          <Link
            to="/"
            className="bg-slate-600 my-3 p-1 px-3 text-white font-medium flex items-center"
          >
            Acessar produtos
          </Link>
        </div>
      )}

      {cart.map(item => (
        <section
          key={item.id}
          className="flex items-center justify-between border-b-2 border-gray-300"
        >
          <img
            src={item.cover}
            alt={item.title}
            className="w-28"
          />

          <strong>
            Preço:{' '}
            {item.price.toLocaleString('pt-PT', {
              style: 'currency',
              currency: 'EUR',
            })}
          </strong>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => removeItemCart(item)}
              className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
            >
              -
            </button>

            {item.amount}

            <button
              onClick={() => handleAddCartItem(item)}
              className="bg-slate-600 px-2 rounded text-white font-medium flex items-center justify-center"
            >
              +
            </button>
          </div>

          <strong className="float-right">
            SubTotal:{' '}
            {item.total.toLocaleString('pt-PT', {
              style: 'currency',
              currency: 'EUR',
            })}
          </strong>
        </section>
      ))}

      {cart.length !== 0 && (
        <div className="flex flex-col items-end">
          <p className="font-bold">
            Total: {total}
          </p>

          <button
            className="bg-slate-600 my-3 p-2 px-4 text-white font-medium"
            onClick={handleFinalizarCompra}
          >
            Finalizar compra
          </button>

          {compraRealizada && (
            <p className="bg-zinc-900 p-2 rounded">
              <BsCartPlus size={20} color="#FFF" />
            </p>
          )}
        </div>
      )}
    </div>
  )
}
