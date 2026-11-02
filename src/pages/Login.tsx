import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const SECRET_PASSWORD = 'admin123';

    const handleLogin = (e: React.SubmitEvent) => {
        e.preventDefault();

        if (password === SECRET_PASSWORD) {
            localStorage.setItem('authToken', 'super-secret-key-123');
            navigate('/dashboard');
        } else {
            setError('Wrong password! Try "admin123"');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
            
            <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
                
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-800">AdminGuard</h1>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm font-medium">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};