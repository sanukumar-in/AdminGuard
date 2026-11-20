import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900 p-4 text-center">
            <h1 className="text-7xl sm:text-9xl font-extrabold text-blue-600 tracking-tight">404</h1>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4 mb-2 text-gray-800">Page Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md text-sm sm:text-base">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm sm:text-base transition shadow-xs cursor-pointer"
            >
                Go Back Home
            </button>
        </div>
    );
};
