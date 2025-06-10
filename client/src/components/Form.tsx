import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import { v4 as uuidv4 } from "uuid"
import { Service } from "../types"
import { categories } from "../data/categories"
import { ServiceActions, ServiceState } from "../reducers/service-reducers"

type FormProps = {
  dispatch: Dispatch<ServiceActions>
  state: ServiceState  // No debería ser opcional
}

const initialState: Service = {
  id: uuidv4(),
  category: 2,
  name: "",
  price: 0,
  duration: "" // Asegúrate que siempre esté inicializado
};


export default function Form({dispatch, state}: FormProps) {
  const [service, setService] = useState<Service>(initialState)

  useEffect(() => {
    if (state.ActiveId) {
      const selectedService = state.Services.find(s => s.id === state.ActiveId);
      if (selectedService) {
        // Asegura que duration tenga un valor válido
        setService({
          ...selectedService,
          duration: selectedService.duration || ""
        });
      }
    } else {
      setService({
        ...initialState,
        id: uuidv4()
      });
    }
  }, [state.ActiveId, state.Services]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setService(prev => ({
      ...prev,
      [id]: ['category', 'price'].includes(id) ? +value : value
    }));
  }
  
  const isValidService = () => {
    const { name, price, category, duration } = service;
    const basicValid = name.trim() !== '' && price > 0;
    
    if (category === 1) { // Estacionamiento
      return basicValid && duration.trim() !== '';
    }
    return basicValid;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({type: 'save-service', payload: {newService: service}})
    setService({
      ...initialState,
      id: uuidv4()
    })
  }
  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label className="text-gray-700 font-bold">Categoría:</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={service.category}
          onChange={handleChange}
          required
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="name" className="font-bold">
          Nombre del Servicio:
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ej. Lavado básico, Estacionamiento por hora"
          className="border border-slate-300 p-2 rounded-lg w-full"
          value={service.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price" className="font-bold">
          Precio:
        </label>
        <input
          id="price"
          type="number"
          placeholder="Precio en $"
          className="border border-slate-300 p-2 rounded-lg w-full"
          value={service.price}
          onChange={handleChange}
          min={0}
        />
      </div>
      
      {service.category === 2 && (
  <div className="mt-4">
    <label htmlFor="duration" className="block font-bold mb-2">
      Duración
    </label>
    <input
      id="duration"
      type="time"
      min={0}
      value={service.duration || ""}
      onChange={handleChange}
      className="w-full p-2 border rounded"
      placeholder="Ej. 1 hora, 30 minutos"
      required
    />

  </div>
)}
      
      <input
        type="submit"
        value="GUARDAR SERVICIO"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-50"
        disabled={!isValidService()}
      />
    </form>
  )
}