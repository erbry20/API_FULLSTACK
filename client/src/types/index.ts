export type Category = {
  id: number;
  name: string;
}

export type Service = {
  id: string,
  category: number, // 1: Lavado, 2: Estacionamiento
  name: string,
  price: number,
  duration: string // Opcional para estacionamiento
}