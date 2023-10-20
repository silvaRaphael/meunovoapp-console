import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Members } from "./pages/members/members";
import { NotFound } from "./pages/not-found";
import { MemberDetails } from "./pages/members/details/details";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Teams } from "./pages/teams/teams";
import { Projects } from "./pages/projects/projects";
import { Tasks } from "./pages/tasks/tasks";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="modular-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/members">
                        <Route path="" element={<Members />} />
                        <Route path=":username" element={<MemberDetails />} />
                    </Route>
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
