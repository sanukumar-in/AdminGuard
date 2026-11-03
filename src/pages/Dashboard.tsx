import { useEffect, useState } from 'react';
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

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="p-10 text-xl">Loading products...</div>;
    }

        return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Product</h1>
            
            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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