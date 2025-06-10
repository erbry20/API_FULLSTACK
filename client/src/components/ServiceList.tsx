import { Service } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ServiceActions } from "../reducers/service-reducers"

type ServiceListProps = {
  services: Service[],
  dispatch: Dispatch<ServiceActions>
}

export default function ServiceList({services, dispatch}: ServiceListProps) {
  const categoryName = useMemo(() => 
    (category: Service['category']) => categories.map(
      cat => cat.id === category ? cat.name : ''
    ).join(''), 
    []
  )

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Servicios Registrados
      </h2>
      {services.map(service => (
        <div key={service.id} className="px-5 py-10 bg-white m-5 flex justify-between shadow rounded-lg">
          <div className="space-y-2 relative">
            <p className={` -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
              ${service.category === 1 ? 'bg-blue-500' : 'bg-green-500'}`}>
              {categoryName(service.category)}
            </p>
            <p className="text-2xl font-bold ps-2">{service.name}</p>
            <p className="font-black text-3xl text-blue-600">
              ${service.price}
            </p>
            {service.duration && (
              <p className="text-gray-600">
                Duración: {service.duration}
              </p>
            )}
          </div>
          <div>
          <button onClick={ () => dispatch({ type: "set-activeId", payload: { id: service.id}})}>
                            <PencilSquareIcon className="h-8 w-8 text-gray-800" />
                        </button>
          </div>
        </div>
      ))}
    </>
  )
}