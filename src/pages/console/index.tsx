import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Page } from "../../components/shared/page";
import { SectionHeader } from "../../components/shared/section-header";

import { useLanguage } from "components/shared/language-provider";
import { ProjectsCard } from "./cards/projects";
import { UsersCard } from "./cards/users";

export function Console() {
    const { language, writeLang } = useLanguage();

    return (
        <Page pathname="/" header={<SectionHeader isRoot title={`Console`} pathname="/"></SectionHeader>}>
            <div className="space-y-8">
                <div className="grid grid-cols-12 gap-x-4">
                    <Card className="col-span-7">
                        <CardHeader>
                            <CardTitle>
                                {writeLang([
                                    ["en", "Projects"],
                                    ["pt", "Projetos"],
                                ])}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ProjectsCard writeLang={writeLang} />
                        </CardContent>
                    </Card>
                    <Card className="col-span-5">
                        <CardHeader>
                            <CardTitle>
                                {writeLang([
                                    ["en", "Users"],
                                    ["pt", "Usuários"],
                                ])}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UsersCard language={language} writeLang={writeLang} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
