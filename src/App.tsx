import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Login } from "./pages/Login";
import { AuthGuard } from "./components/AuthGuard";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";

const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const ProductDetails = lazy(() => import('./pages/ProductDetails').then(m => ({ default: m.ProductDetails })));

const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        <span className="sr-only">Loading...</span>
    </div>
);

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            localStorage.getItem('authToken')
                                ? <Navigate to="/app" replace />
                                : <Login />
                        }
                    />
                    <Route path="/login" element={<Login />} />

                    <Route
                        path="/app"
                        element={
                            <AuthGuard>
                                <Home />
                            </AuthGuard>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>

                    <Route
                        path="/product/:id"
                        element={
                            <AuthGuard>
                                <ProductDetails />
                            </AuthGuard>
                        }
                    />

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default App;