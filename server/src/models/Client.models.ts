// src/models/Client.models.ts
import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "clients", // nombres en minúsculas para consistencia
  timestamps: true,
  underscored: true,
})
class Client extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  name!: string;

  @Column({
    type: DataType.STRING(50),
  })
  apellidoP!: string;

  @Column({
    type: DataType.STRING(50),
  })
  apellidoM!: string;

  @Column({
    type: DataType.BIGINT,
  })
  telefono!: number;
  @Column({
    type: DataType.STRING(100),
  })
  Email!: string ;
}

export default Client;
