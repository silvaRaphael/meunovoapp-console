import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Login } from "pages/login";
import { NotFound } from "pages/not-found";
import { Console } from "pages/console";
import { Members } from "pages/members";
import { MemberDetails } from "pages/members/details/details";
import { Projects } from "pages/projects";
import { Tasks } from "pages/tasks";
import { ProjectDetails } from "pages/projects/details/details";
import { TaskDetails } from "pages/tasks/details/details";
import { Schedule } from "pages/schedule";
import { Profile } from "pages/profile";
import { Preferences } from "pages/preferences";
import { useLanguage } from "components/shared/language-provider";
import { useAuth } from "components/shared/auth-provider";
import { Emails } from "pages/emails";

export function App() {
    const { writeLang } = useLanguage();
    const { auth } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                {
                    <Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </Route>
                }
                {auth && (
                    <Route>
                        {auth.role === "admin" && (
                            <Route path="/">
                                <Route path="" element={<Console />} />
                                <Route path="emails" element={<Emails />} />
                                <Route
                                    path={
                                        writeLang([
                                            ["en", "/clients"],
                                            ["pt", "/clientes"],
                                        ]) as string
                                    }
                                >
                                    <Route path="" element={<Members />} />
                                    <Route path=":id" element={<MemberDetails />} />
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
                                    element={<NotFound />}
                                />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        )}
                        {auth.role === "client" && (
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
                                    element={<NotFound />}
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
