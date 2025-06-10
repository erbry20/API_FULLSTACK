// src/handlers/client.ts
import { Request, Response } from "express";
import Client from "../models/Client.models";

/// Crear cliente
export const createClient = async (req: Request, res: Response) => {
  try {
    const client = await Client.create(req.body);
    res.json({ data: client });
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

/// Obtener todos los clientes
export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll({
      order: [['id', 'ASC']],
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: 5,
    });

    res.json({ data: clients });
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

/// Obtener cliente por ID
export const getClientById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return;
    }
    res.json({ data: client });
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
};

/// Actualizar cliente
export const updateClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return;
    }
    await client.update(req.body);
    await client.save();
    res.json({ data: client });
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};

/// Eliminar cliente
export const deleteClient = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      res.status(404).json({ error: 'Cliente no encontrado' });
      return;
    }
    await client.destroy();
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
};
