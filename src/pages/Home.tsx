import { NavLink, Outlet } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            <nav className="bg-white shadow p-4 flex gap-6 mb-6">
                <h1 className="font-bold text-xl mr-auto text-blue-600">AdminGuard</h1>
                
                <NavLink 
                    to="." 
                    end
                    className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-500"}
                >
                    Dashboard
                </NavLink>
                
                <NavLink 
                    to="profile" 
                    className={({ isActive }) => isActive ? "text-blue-600 font-bold" : "text-gray-500"}
                >
                    Profile
                </NavLink>
            </nav>

            <div className="p-6">
                <Outlet />
            </div>
        </div>
    );
};