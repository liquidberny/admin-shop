import { dummyApi } from '@/api/dummyApi';
import type { Product } from './interfaces/productDummy.interface';


export const getProductsAction = async (
  page: number = 1,
  limit: number = 10
) => {
  try {
    // Calcular el valor de `skip` basado en la página actual
    const skip = (page - 1) * limit;
    const { data } = await dummyApi.get<{ products: Product[] }>(
      `/products?limit=${limit}&skip=${skip}`
    );
    
    return data.products;
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    throw new Error('Error obteniendo productos');
  }
};

