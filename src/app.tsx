import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "pages/login";
import { NotFound } from "pages/not-found";
import { Console } from "pages/console";
import { Clients } from "pages/clients";
import { ClientDetails } from "pages/clients/details";
import { Projects } from "pages/projects";
import { Tasks } from "pages/tasks";
import { ProjectDetails } from "pages/projects/details";
import { TaskDetails } from "pages/tasks/details";
import { Schedule } from "pages/schedule";
import { Profile } from "pages/profile";
import { Preferences } from "pages/preferences";
import { useLanguage } from "components/shared/language-provider";
import { useAuth } from "components/shared/auth-provider";
import { Emails } from "pages/emails";
import { EmailDetails } from "pages/emails/details";
import { CompleteProfile } from "pages/complete-profile";
import { CommingSoon } from "pages/comming-soon";

export function App() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {
                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/comecar" element={<CompleteProfile />} />
                        {!auth?.token && <Route path="/*" element={<Navigate to="/login" />} />}
                    </Route>
                }
                {!!auth?.token && (
                    <Route>
                        {["master", "admin"].includes(auth.role) && (
                            <Route path="/">
                                <Route path="" element={<Console />} />
                                <Route path="emails">
                                    <Route path="" element={<Emails />} />
                                    <Route path=":id" element={<EmailDetails />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/clients"],
                                            ["pt", "/clientes"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Clients />} />
                                    <Route path=":id" element={<ClientDetails />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/projects"],
                                            ["pt", "/projetos"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Projects />} />
                                    <Route path=":id" element={<ProjectDetails />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/tasks"],
                                            ["pt", "/tarefas"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Tasks />} />
                                    <Route path=":id" element={<TaskDetails />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/schedule"],
                                            ["pt", "/calendario"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Schedule />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/profile"],
                                            ["pt", "/perfil"],
                                        ]) as string
                                    }
                                    element={<Profile />}
                                />
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/preferences"],
                                            ["pt", "/preferencias"],
                                        ]) as string
                                    }
                                    element={<Preferences />}
                                />
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/support"],
                                            ["pt", "/suporte"],
                                        ]) as string
                                    }
                                    element={<CommingSoon />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        )}
                        {["client"].includes(auth.role) && (
                            <Route path="/">
                                <Route path="" element={<Console />} />
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/projects"],
                                            ["pt", "/projetos"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Projects />} />
                                    <Route path=":id" element={<ProjectDetails />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/tasks"],
                                            ["pt", "/tarefas"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Tasks />} />
                                    <Route path=":id" element={<TaskDetails />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/schedule"],
                                            ["pt", "/calendario"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Schedule />} />
                                </Route>
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/profile"],
                                            ["pt", "/perfil"],
                                        ]) as string
                                    }
                                    element={<Profile />}
                                />
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/preferences"],
                                            ["pt", "/preferencias"],
                                        ]) as string
                                    }
                                    element={<Preferences />}
                                />
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/support"],
                                            ["pt", "/suporte"],
                                        ]) as string
                                    }
                                    element={<CommingSoon />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        )}
                    </Route>
                )}
            </Routes>
        </BrowserRouter>
    );
}
