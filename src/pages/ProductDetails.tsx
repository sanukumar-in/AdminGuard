import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService, Product } from '../services/productService';
import { getErrorMessage } from '../services/errorHandler';
import { toast } from 'react-toastify';

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
            } catch (err) {
                const errorMessage = getErrorMessage(err);
                setError(errorMessage);
                console.error("Failed to fetch product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                {/* Back button shimmer */}
                <div className="w-36 h-5 rounded mb-6 shimmer" />

                {/* Main card shimmer */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">
                        <div className="min-h-[260px] sm:min-h-[340px] rounded-xl shimmer" />
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="w-20 h-4 rounded shimmer" />
                            <div className="w-4/5 h-8 rounded shimmer" />
                            <div className="w-28 h-7 rounded shimmer" />
                            <div className="w-full h-24 rounded shimmer" />
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <div className="flex-1 h-10 rounded-lg shimmer" />
                                <div className="flex-1 h-10 rounded-lg shimmer" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center p-4">
                <div className="bg-red-50 border border-red-200 p-6 rounded-xl max-w-md w-full text-center">
                    <p className="text-red-700 text-sm font-medium mb-4">{error}</p>
                    <button
                        onClick={() => navigate('/app')}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-4 text-center">
                <p className="text-lg text-gray-600 mb-4">Product not found.</p>
                <button
                    onClick={() => navigate('/app')}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition cursor-pointer"
            >
                <span className="mr-1.5">&larr;</span> Back to Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10">

                    <div className="flex items-center justify-center bg-gray-50/70 rounded-xl p-6 sm:p-8 border border-gray-100 min-h-[260px] sm:min-h-[340px]">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-72 w-auto object-contain mix-blend-multiply"
                        />
                    </div>

                    <div className="flex flex-col justify-center">
                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                            {product.category}
                        </span>

                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-snug">
                            {product.title}
                        </h1>

                        <div className="mb-4">
                            <span className="text-2xl sm:text-3xl font-bold text-gray-900">${product.price}</span>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={() => toast.info("Proceeding to checkout...")}
                                className="flex-1 py-2.5 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-2xs cursor-pointer"
                            >
                                Buy Now
                            </button>
                            <button
                                onClick={() => toast.success("Added to cart!")}
                                className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition cursor-pointer"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
