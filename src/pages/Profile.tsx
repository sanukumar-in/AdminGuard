import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        toast.info("Logged out successfully.");
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
                        <p className="text-sm text-gray-500">Manage your profile settings and session.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="self-start sm:self-auto px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition shadow-xs cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
