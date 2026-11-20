import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
}

export const ProductCard = React.memo(({ id, title, price, image, category }: ProductCardProps) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${id}`);
    };

    return (
        <div 
            onClick={handleNavigate}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleNavigate();
                }
            }}
            role="link"
            tabIndex={0}
            className="group bg-white p-4 rounded-xl shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-gray-200 flex flex-col cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <div className="h-44 w-full flex items-center justify-center mb-3 bg-gray-50/80 rounded-lg p-3 overflow-hidden">
                <img 
                    src={image} 
                    alt={title} 
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200" 
                />
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1 truncate">{category}</div>
            <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors" title={title}>
                {title}
            </h3>
            <p className="text-blue-600 font-bold text-base mt-auto pt-1">${price}</p>
        </div>
    );
});
