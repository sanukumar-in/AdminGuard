import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-4">
            <h1 className="text-9xl font-bold text-blue-400">404</h1>
            <h2 className="text-3xl font-semibold mt-4 mb-2">Page Not Found</h2>
            <p className="text-slate-300 mb-8 text-center max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition shadow-lg"
            >
                Go Back Home
            </button>
        </div>
    );
};