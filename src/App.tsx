import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Members } from "./pages/members/members";
import { NotFound } from "./pages/not-found";
import { MemberDetails } from "./pages/members/details";

export function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<NotFound />} />
                <Route path="/members">
                    <Route path="" element={<Members />} />
                    <Route path=":username" element={<MemberDetails />} />
                </Route>
                <Route path="/teams" element={<NotFound />} />
                <Route path="/projects" element={<NotFound />} />
                <Route path="/tasks" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
