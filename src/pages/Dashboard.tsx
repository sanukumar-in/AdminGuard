import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
            
            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-lg w-full">
                
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    Welcome!
                </h1>

                <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 active:bg-red-700 transition shadow-md hover:shadow-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};