import { NavLink, Outlet } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col text-gray-900">
            {/* Navigation Header */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-2xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="font-bold text-xl text-blue-600">AdminGuard</h1>
                        
                        <div className="flex items-center gap-2 sm:gap-4">
                            <NavLink 
                                to="." 
                                end
                                className={({ isActive }) => 
                                    `px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive 
                                            ? "bg-blue-50 text-blue-600 font-semibold" 
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                            
                            <NavLink 
                                to="profile" 
                                className={({ isActive }) => 
                                    `px-3.5 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive 
                                            ? "bg-blue-50 text-blue-600 font-semibold" 
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                                    }`
                                }
                            >
                                Profile
                            </NavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content Container */}
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
                <Outlet />
            </main>
        </div>
    );
};
