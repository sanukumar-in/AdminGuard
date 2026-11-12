import { useEffect, useState, useMemo, useRef } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {Product, productService} from '../services/productService';
import { getErrorMessage } from '../services/errorHandler';

export const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [error, setError] = useState<string | null>(null);

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [products, searchQuery]);

        useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                let productsData;
                if (selectedCategory !== 'all') {
                    productsData = await productService.getByCategory(selectedCategory);
                } else {
                    productsData = await productService.getAll();
                }
                
                setProducts(productsData);
            } catch (error: any) {
                if (error.code === 'ERR_CANCELED') {
                    console.log("Previous request cancelled. Fetching new data...");
                } else {
                    const errorMessage = getErrorMessage(error);
                    setError(errorMessage);
                    console.error("Error fetching data:", error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, [selectedCategory]);

    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!loading) {
            searchInputRef.current?.focus();
        }
    }, [loading]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="p-10">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

        return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Product Listing</h1>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition shadow"
                >
                    Logout
                </button>
            </div>
            
            <div className="mb-8">
                <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={
                        (e) => setSearchParams({ search: e.target.value })
                    }
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        image={product.image}
                        category={product.category}
                    />
                ))}
            </div>
        </div>
    );
};