import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import { user } from "config/user";

export function App() {
    const { writeLang } = useLanguage();

    return (
        <BrowserRouter>
            {user.role === "admin" && (
                <Routes>
                    <Route path="/">
                        <Route path="" element={<Console />} />
                        <Route path="emails" element={<NotFound />} />
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
                </Routes>
            )}
            {user.role === "client" && (
                <Routes>
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
                </Routes>
            )}
        </BrowserRouter>
    );
}
