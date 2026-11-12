import apiClient from './api';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export const productService = {
    
    getAll: async () => {
        const response = await apiClient.get<Product[]>('/products');
        return response.data;
    },

    getById: async (id: string | undefined) => {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    },

    getByCategory: async (category: string) => {
        const response = await apiClient.get<Product[]>(`/products/category/${category}`);
        return response.data;
    }
};