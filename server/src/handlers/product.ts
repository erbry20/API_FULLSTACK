import { Request, Response } from "express";
import  Product  from "../models/Product.models";    

export const createProduct = async (req: Request, res:Response) => {
    const  product = await Product.create(req.body);
    res.json({data: product});
}

///metodo get para los productos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt', 'disponibility'] },
      limit: 5,
    });

    res.json({ data: products });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const getProductsById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return
    }
    res.json({ data: product });
  } catch (error) {
    console.error('Error al obtener el producto:', error);
  }
}   

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return
    }
    await product.update(req.body);
    await product.save();
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (!product) {
    res.status(404).json({ error: 'Producto no encontrado' });
    return
  }
  await product.destroy();
  res.json({ message: 'Producto eliminado' })
}   