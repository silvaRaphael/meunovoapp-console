import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import { ProjectDetails } from "./pages/projects/details/details";
import { TaskDetails } from "./pages/tasks/details/details";
import { Schedule } from "./pages/schedule/schedule";
import { Notes } from "./pages/notes/notes";
import { Profile } from "./pages/profile/profile";
import { Preferences } from "./pages/preferences/preferences";
import { Pricing } from "./pages/pricing/pricing";
import { PlanCheckout } from "./pages/pricing/details/checkout/checkout";
import { PlanCustomize } from "./pages/pricing/details/customize/customize";
import { LanguageProvider } from "./components/language-provider";
import { enUS } from "date-fns/locale";

export function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="quat-ui-theme">
            <LanguageProvider
                defaultLanguage={{
                    label: "English",
                    lang: "en",
                    locale: "en-US",
                    currency: "USD",
                    dateLocale: enUS,
                }}
                storageKey="quat-language"
            >
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
                        <Route path="/projects">
                            <Route path="" element={<Projects />} />
                            <Route path=":id" element={<ProjectDetails />} />
                        </Route>
                        <Route path="/tasks">
                            <Route path="" element={<Tasks />} />
                            <Route path=":id" element={<TaskDetails />} />
                        </Route>
                        <Route path="/schedule">
                            <Route path="" element={<Schedule />} />
                        </Route>
                        <Route path="/notes">
                            <Route path="" element={<Notes />} />
                        </Route>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/preferences" element={<Preferences />} />
                        <Route path="/pricing">
                            <Route path="" element={<Pricing />} />
                            <Route path="customize/:id" element={<PlanCustomize />} />
                            <Route path="checkout" element={<PlanCheckout />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </LanguageProvider>
        </ThemeProvider>
    );
}
