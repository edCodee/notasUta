

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas Públicas
import Home from "../pages/Home";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ZONA publica */}
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}