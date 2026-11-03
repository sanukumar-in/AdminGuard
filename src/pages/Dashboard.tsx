import { useEffect, useState, useMemo, useRef } from 'react';
import axios from 'axios';
import { ProductCard } from '../components/ProductCard';

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    image: string;
}

export const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [products, searchQuery]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                let url = 'https://fakestoreapi.com/products';
                if (selectedCategory !== 'all') {
                    url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
                }
                const response = await axios.get(url, { signal: controller.signal });
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
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

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
                <span className="sr-only">Loading...</span>
            </div>
        )
    }

        return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Product</h1>
            
            <div className="mb-8">
                <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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