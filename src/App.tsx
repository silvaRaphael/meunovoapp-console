import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Members } from "./pages/members/members";
import { NotFound } from "./pages/not-found";
import { MemberDetails } from "./pages/members/details/details";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Teams } from "./pages/teams/teams";
import { Projects } from "./pages/projects/projects";
import { Tasks } from "./pages/tasks/tasks";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toast/toaster";
import { TeamDetails } from "./pages/teams/details/details";

export function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="modular-ui-theme">
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/members">
                        <Route path="" element={<Members />} />
                        <Route path=":username" element={<MemberDetails />} />
                    </Route>
                    <Route path="/teams">
                        <Route path="" element={<Teams />} />
                        <Route path=":slug" element={<TeamDetails />} />
                    </Route>
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/tasks" element={<Tasks />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}
