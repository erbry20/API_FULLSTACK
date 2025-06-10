//import { createProduct } from './handlers/product';
import { createClient, getClients, getClientById, updateClient, deleteClient } from './handlers/client';
import { createProduct, getProducts, getProductsById, updateProduct, deleteProduct } from './handlers/product';
import  {body, param} from 'express-validator';
import { handleinputerros } from './middleware/index';
///src/router.ts
import express from "express";

const router =express();

router.get('/data', (req, res) => {
    const data = [
        { id: 1, name: 'John Doe',apellido: 'Doe', edad: 30 },
        { id: 2, name: 'Jane Smith',apellido: 'Smith', edad: 25 },
        { id: 3, name: 'Alice Johnson',apellido: 'Johnson', edad: 28 },
        { id: 4, name: 'Bob Brown',apellido: 'Brown', edad: 35 }
    ]
    res.json(data);
});

router.post("/",
    body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
    .isNumeric().withMessage('El precio debe ser un número')
    .notEmpty().withMessage('El precio es obligatorio')
    .custom((value) => value > 0).withMessage('El precio debe ser mayor a 0'),
    handleinputerros,
    createProduct
 );
router.get("/", getProducts );
router.get("/:id", 
    param('id').isInt().withMessage('El id debe ser un número'),
    handleinputerros,   
    getProductsById
  
 );
    
router.put("/:id",
    body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),
    body('price')
    .isNumeric().withMessage('El precio debe ser un número')
    .notEmpty().withMessage('El precio es obligatorio')
    .custom((value) => value > 0).withMessage('El precio debe ser mayor a 0'),
    body('disponibily')
    .isBoolean().withMessage('El valor de disponibilidad debe ser verdadero o falso'),
    handleinputerros,
    updateProduct
);

//ruta para eliminar un producto
router.delete("/:id",
    param('id').isInt().withMessage('El id debe ser un número'),
    handleinputerros,
    deleteProduct
);

router.patch("/", (req, res) => {
    res.send("Hello World desde pacht");
});

/// RUTAS PARA CLIENTE
router.post("/clients",
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('apellidoP')
    .notEmpty().withMessage('El apellido paterno es obligatorio'),

  body('apellidoM')
    .notEmpty().withMessage('El apellido materno es obligatorio'),

  body('telefono')
    .isNumeric().withMessage('El teléfono debe ser un número')
    .notEmpty().withMessage('El teléfono es obligatorio'),

  body('Email')
    .isEmail().withMessage('El correo debe tener un formato válido')
    .notEmpty().withMessage('El correo es obligatorio'),

  handleinputerros,
  createClient
);

router.get("/clients", getClients);

router.get("/clients/:id",
  param('id').isInt().withMessage('El id debe ser un número'),
  handleinputerros,
  getClientById
);

router.put("/clients/:id",
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio'),

  body('apellidoP')
    .notEmpty().withMessage('El apellido paterno es obligatorio'),

  body('apellidoM')
    .notEmpty().withMessage('El apellido materno es obligatorio'),

  body('telefono')
    .isNumeric().withMessage('El teléfono debe ser un número')
    .notEmpty().withMessage('El teléfono es obligatorio'),

  body('Email')
    .isEmail().withMessage('El correo debe tener un formato válido')
    .notEmpty().withMessage('El correo es obligatorio'),

  handleinputerros,
  updateClient
);

router.delete("/clients/:id",
  param('id').isInt().withMessage('El id debe ser un número'),
  handleinputerros,
  deleteClient
);



export default router;
