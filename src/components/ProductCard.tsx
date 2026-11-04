import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    id: number,
    title: string;
    price: number;
    image: string;
    category: string;
}

export const ProductCard = ({ id, title, price, image, category }: ProductCardProps) => {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/product/${id}`)}
         className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border border-gray-100">
            <div className="h-40 flex items-center justify-center mb-4 bg-gray-50 rounded p-2">
                <img src={image} alt={title} className="max-h-full object-contain" />
            </div>
            <div className="text-xs text-gray-500 uppercase mb-1">{category}</div>
            <h3 className="font-semibold text-gray-800 truncate">{title}</h3>
            <p className="text-blue-600 font-bold mt-1">${price}</p>
        </div>
    );
};