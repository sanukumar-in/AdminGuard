import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { AuthGuard } from "./components/AuthGuard";
import { NotFound } from "./pages/NotFound";
import { ProductDetails } from "./pages/ProductDetails";
import { Profile } from "./pages/Profile";
import { Home } from "./pages/Home";

const App = () => {
  return (
     <BrowserRouter>
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
        </BrowserRouter>
  )
}

export default App;