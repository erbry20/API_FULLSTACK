import { Service } from "../types";

export type ServiceActions =
  | { type: "save-service"; payload: { newService: Service } }
  | { type: "set-activeId"; payload: { id: string } }; // Asegúrate de que esté definido

export type ServiceState = {
  Services: Service[];
  ActiveId: Service["id"];
};

export const initialState: ServiceState = {
  Services: [],
  ActiveId: "",
};

export const serviceReducer = (
  state: ServiceState = initialState,
  action: ServiceActions
): ServiceState => {
  switch (action.type) {
    case "save-service": {
      const updatedService = action.payload.newService;
      // Asegurar que estacionamiento tenga duration
      if (updatedService.category === 2 && !updatedService.duration) {
        updatedService.duration = "1 hora"; // Valor por defecto
      }

      const updatedServices = state.ActiveId
        ? state.Services.map((s) =>
            s.id === state.ActiveId ? updatedService : s
          )
        : [...state.Services, updatedService];

      return {
        ...state,
        Services: updatedServices,
        ActiveId: "",
      };
    }
    case "set-activeId":
      console.log("ID recibido:", action.payload.id); // Verifica si llega el ID
      return {
        ...state,
        ActiveId: action.payload.id, // Actualiza el ID activo
      };

    default:
      return state;
  }
};
