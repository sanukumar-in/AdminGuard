import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, Product } from '../services/productService';
import { getErrorMessage } from '../services/errorHandler';

export const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

        useEffect(() => {
        const fetchProduct = async () => {
            try {
                setError(null);
                setLoading(true);
                const data = await productService.getById(id);
                setProduct(data);
            } catch (error) {
                const errorMessage = getErrorMessage(error);
                setError(errorMessage);
                console.error("Failed to fetch product:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                <span className="sr-only">Loading...</span>
            </div>
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-10">
                <div className="bg-red-50 border border-red-200 p-6 rounded-lg max-w-md">
                    <p className="text-red-600 font-medium text-center">{error}</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center text-xl text-red-500">Product not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-8 flex items-center text-blue-600 hover:text-blue-800 font-medium transition"
            >
                <span className="mr-2">&larr;</span> Back to Dashboard
            </button>

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                    
                    <div className="flex items-center justify-center bg-gray-50 rounded-xl p-10 border border-gray-100">
                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className="max-h-80 object-contain mix-blend-multiply" 
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                            {product.category}
                        </span>
                        
                        <h1 className="text-3xl font-bold text-gray-800 mb-4 leading-tight">
                            {product.title}
                        </h1>

                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-4xl font-bold text-gray-900">${product.price}</span>
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="flex gap-4">
                            <button className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md">
                                Buy Now
                            </button>
                            <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};