import { useEffect, useState, useContext } from 'react'
import { BsCartPlus } from 'react-icons/bs'

import { api } from '../../services/api'
import { CartContext } from '../../contexts/CartContex'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

export interface ProductProps {
  id: string;
  title: string;
  description: string;
  price: number;
  cover: string;
}

export function Home() {
  const { addItemCart } = useContext(CartContext)
  const [products, setProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    async function getProducts() {
      const response = await api.get("/db.json")
      setProducts(response.data.produtos)
      

    }
    getProducts()

  }, [])

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

  return (
    <div>
      <main className="w-full max-w-7xl px-4 max-auto ">
        <h1 className="font-bold text-2xl mb-4 mt-10 text-center">Preço em Alta</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">

          {products.map((produtos) => (
            <section key={produtos.id} className="w-full">
              <Link to={`/produtos/${produtos.id}`}>
                <img
                  className="w-full rounded-lg max-h-70 mb-2"
                  src={produtos.cover}
                  alt={produtos.title}
                />
              </Link>

              <p className='font-medium mt-1 mb-2'>{produtos.title}</p>
              <div className='flex gap-3 items-center'>

                <strong className='text-zinc-700/90'>
                  {produtos.price.toLocaleString("pt-PT", {
                    style: "currency",
                    currency: "EUR"
                  })}
                </strong>

                <button className='bg-zinc-900 p-1 rounded' onClick={() => handleAddCartItem(produtos)}>

                  <BsCartPlus size={20} color='#FFf' />

                </button>

              </div>

            </section>

          ))}



        </div>
      </main>

    </div>
  )
}