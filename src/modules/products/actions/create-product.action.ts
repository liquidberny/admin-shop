import { dummyApi } from '@/api/dummyApi';
import type { ProductElement } from '@/modules/products/actions/interfaces/productDummy.interface';

export const addProductAction = async (product: Partial<ProductElement>) => {
  try {
    const { data } = await dummyApi.post<ProductElement>('/products/add', product);
    return data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw new Error('Error agregando el producto');
  }
};
