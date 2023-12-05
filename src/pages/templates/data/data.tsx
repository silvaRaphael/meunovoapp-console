import { ReplyMessageEmail } from "components/shared/emails/reply-message-email";
import { Template } from "./template";
import { InviteUserEmail } from "components/shared/emails/invite-user-email";
import { render } from "@react-email/components";

export const templates: Template[] = [
    {
        id: "1",
        name: "Convidar Usuário",
        component: render(<InviteUserEmail userId="[userId]" />),
    },
    {
        id: "2",
        name: "Responder Mensagem",
        component: render(
            <ReplyMessageEmail
                name="[name]"
                title="[title]"
                projectDetails="[projectDetails]"
                projectScope={[{ title: "[scopeTitle]", value: "[scopeValue]" }]}
                projectDueDays="00"
                projectBenefits="[projectBenefits]"
                projectPayment="[projectPayment]"
            />,
        ),
    },
];
