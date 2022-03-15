/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Producto, 'id'>, schemaOptions: { title: 'NewProducto', exclude: [ 'id' ] })
 */
export interface NewProducto {
  color?: string;
  marca?: string;
  nombre: string;
  peso?: number;
  volumen?: number;
}
