import { useReducer, useEffect } from 'react'
import Form from './components/Form'
import { serviceReducer, initialState, ServiceState } from './reducers/service-reducers'
import ServiceList from './components/ServiceList'
import './index.css'
import ProductManager from "./components/ProductManager";

function App() {
  const loadState = (): ServiceState => {
    try {
      const saved = localStorage.getItem("services")
      if (saved) {
        return JSON.parse(saved) as ServiceState
      }
    } catch (error) {
      console.error("Failed to parse saved state", error)
    }
    return initialState
  }

  const [state, dispatch] = useReducer(serviceReducer, loadState())

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(state))
  }, [state])

  return (
    <>
      <header className='bg-blue-600 text-white p-3'>
        <div className='max-w-5xl mx-auto flex justify-between'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>
            Sistema de Autolavado y Estacionamiento
          </h1>
        </div>
      </header>

      <section className='bg-blue-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form dispatch={dispatch} state={state} />
        </div>
      </section>

      <section className='p-10 max-w-4xl mx-auto'>
        <ServiceList services={state.Services} dispatch={dispatch} />
      </section>

      {/* Aquí abajo ponemos ProductManager */}
      <section className="p-10 max-w-4xl mx-auto border-t mt-10">
        <h2 className="text-xl font-bold mb-4">Gestión de Productos</h2>
        <ProductManager />
      </section>
    </>
  )
}

export default App
