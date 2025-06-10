///models/Product.models.ts
import { Model } from "sequelize-typescript";

// src/models/Product.models.ts
import { Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "products",
  timestamps: true,
  underscored: true,
})
class Product extends Model {
  @Column({
    type: DataType.STRING(100),
  })
  name!: string;

  @Column({
    type: DataType.FLOAT(5, 2),
  })
  price!: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  disponibily!: boolean;
}

export default Product;
