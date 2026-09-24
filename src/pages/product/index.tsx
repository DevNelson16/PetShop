import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CartContext } from '../../contexts/CartContex'
import { BsCartPlus } from 'react-icons/bs'
import { api } from '../../services/api'

interface ProductProps {
  id: string
  title: string
  description: string
  price: number
  cover: string
}

export function Product() {
  const { addItemCart } = useContext(CartContext)
  const { id } = useParams()

  const [product, setProduct] = useState<ProductProps | null>(null)

  useEffect(() => {
    if (!id) return

    async function getProduct() {
      try {
        const response = await api.get(`/produtos/${id}`)

        console.log('Produto recebido:', response.data)

        setProduct(response.data)
      } catch (error) {
        console.error('Erro ao buscar produto:', error)
      }
    }

    getProduct()
  }, [id])

  function handleAddCartItem(product: ProductProps) {
    toast.success("Produto adicionado no carrinho", {
      style: {
        borderRadius: 10,
        backgroundColor: "#121212",
        color: "#FFF"
      }
    })
    addItemCart(product)
  }


  if (!product) {
    return <p>Carregando produto...</p>
  }

  return (
    <main className="w-full max-w-7xl px-4 mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <img
          src={product.cover}
          alt={product.title}
          className="w-full rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-zinc-600 mb-6">
            {product.description}
          </p>

          <strong className="text-2xl">
            {product.price.toLocaleString('pt-PT', {
              style: 'currency',
              currency: 'EUR'
            })}
          </strong>

          <button className='bg-zinc-900 p-1 rounded' onClick={() => handleAddCartItem(product)}>

            <BsCartPlus size={20} color='#FFf' />

          </button>
        </div>

      </div>
    </main>
  )
}