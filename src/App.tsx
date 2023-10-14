import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Members } from "./pages/members";
import { NotFound } from "./pages/not-found";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NotFound />} />
                <Route path="/members/:id?" element={<Members />} />
                <Route path="/teams" element={<NotFound />} />
                <Route path="/projects" element={<NotFound />} />
                <Route path="/tasks" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
