import { useEffect, useState, useMemo, useRef } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useSearchParams } from 'react-router-dom';
import { Product, productService } from '../services/productService';
import { getErrorMessage } from '../services/errorHandler';
import { useDebounce } from '../hooks/useDebounce';

export const Dashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';
    const [inputValue, setInputValue] = useState(searchQuery);

    const debouncedSearch = useDebounce(inputValue, 500);

    const [selectedCategory, setSelectedCategory] = useState('all');
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        if (debouncedSearch) {
            setSearchParams({ search: debouncedSearch });
        } else {
            setSearchParams({});
        }
    }, [debouncedSearch, setSearchParams]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [products, debouncedSearch]);

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const indexOfLastProduct = safeCurrentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    const handleSearchChange = (val: string) => {
        setInputValue(val);
        setCurrentPage(1);
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                let productsData: Product[];
                if (selectedCategory !== 'all') {
                    productsData = await productService.getByCategory(selectedCategory);
                } else {
                    productsData = await productService.getAll();
                }
                
                setProducts(productsData);
            } catch (err: unknown) {
                const errorMessage = getErrorMessage(err);
                setError(errorMessage);
                console.error("Error fetching data:", err);
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
            <div className="space-y-6">
                {/* Header: Title placeholder */}
                <div className="pb-2 border-b border-gray-200">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Listing</h1>
                </div>

                {/* Search & filter shimmer */}
                <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <div className="w-full sm:max-w-md h-10 rounded-lg shimmer" />
                    <div className="w-full sm:w-44 h-10 rounded-lg shimmer" />
                </div>

                {/* Shimmer Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: productsPerPage }).map((_, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-2xs border border-gray-200 flex flex-col">
                            <div className="h-44 w-full rounded-lg mb-3 shimmer" />
                            <div className="w-1/3 h-3 rounded mb-2 shimmer" />
                            <div className="w-3/4 h-4 rounded mb-1.5 shimmer" />
                            <div className="w-1/2 h-4 rounded mb-3 shimmer" />
                            <div className="w-1/4 h-5 rounded mt-auto shimmer" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-8">
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl max-w-lg mx-auto">
                    <p className="text-red-700 text-sm font-medium text-center">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header: Title */}
            <div className="pb-2 border-b border-gray-200">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Product Listing</h1>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <input
                    type="text"
                    ref={searchInputRef}
                    placeholder="Search products..."
                    value={inputValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full sm:max-w-md px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                    <option value="all">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="jewelery">Jewelery</option>
                    <option value="men's clothing">Men's Clothing</option>
                    <option value="women's clothing">Women's Clothing</option>
                </select>
            </div>
            
            {/* Content: Empty State or Products Grid */}
            {currentProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-xl border border-gray-200 text-center">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-800">No products found</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">We couldn't find anything matching "{debouncedSearch}"</p>
                    <button 
                        onClick={() => {
                            setInputValue('');
                            setSearchParams({});
                            setCurrentPage(1);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {currentProducts.map((product) => (
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

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 pt-6">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={safeCurrentPage === 1}
                                className="px-3.5 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 bg-white transition cursor-pointer"
                            >
                                Previous
                            </button>
                            
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 text-sm font-medium border rounded-lg transition cursor-pointer ${
                                        safeCurrentPage === page
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                                            : 'border-gray-300 hover:bg-gray-50 bg-white text-gray-700'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={safeCurrentPage === totalPages}
                                className="px-3.5 py-2 text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 bg-white transition cursor-pointer"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
