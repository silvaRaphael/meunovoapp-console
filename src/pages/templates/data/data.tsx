import { render } from '@react-email/components'
import { Template } from './template'
import { ResetPasswordEmail } from 'components/shared/emails/reset-password'
import { ReplyMessageEmail } from 'components/shared/emails/reply-message-email'
import { InviteUserEmail } from 'components/shared/emails/invite-user-email'
import { ContactEmail } from 'components/shared/emails/contact-email'
import { BudgetEmail } from 'components/shared/emails/budget-email'
import { ReplyBudgetEmail } from 'components/shared/emails/reply-budget-email'
import { NotificationMessageEmail } from 'components/shared/emails/notification-message-email'

export const templates: Template[] = [
  {
    id: 'reset-password',
    name: 'Recuperar Senha',
    component: render(<ResetPasswordEmail resetPasswordKey="[resetPasswordKey]" name="[name]" />)
  },
  {
    id: 'invide-user',
    name: 'Convidar Usuário',
    component: render(<InviteUserEmail userId="[userId]" />)
  },
  {
    id: 'contact-message',
    name: 'Mensagem de Contato',
    component: render(<ContactEmail name="[name]" email="[email]" phone="[phone]" message="[message]" />)
  },
  {
    id: 'budget-message',
    name: 'Mensagem de Orçamento',
    component: render(
      <BudgetEmail
        name="[name]"
        email="[email]"
        phone="[phone]"
        company="[company]"
        role="[role]"
        description="[description]"
        budget="[budget]"
        projectType="[projectType]"
        due="[due]"
      />
    )
  },
  {
    id: 'reply-message',
    name: 'Responder Mensagem de Contato',
    component: render(
      <ReplyMessageEmail name="[name]" title="[title]" receivedMessage="[receivedMessage]" message="[message]" />
    )
  },
  {
    id: 'reply-budget',
    name: 'Responder Mensagem de Orçamento',
    component: render(
      <ReplyBudgetEmail
        name="[name]"
        title="[title]"
        projectDetails="[projectDetails]"
        projectScope="[projectScope]"
        projectStartDate="[projectStartDate]"
        projectEndDate="[projectEndDate]"
        projectBenefits="[projectBenefits]"
        projectPayment="[projectPayment]"
      />
    )
  },
  {
    id: 'notification-message',
    name: 'Notificação de Atualização',
    component: render(
      <NotificationMessageEmail title="[title]" name="[name]" projectName="[projectName]" description="[description]" />
    )
  }
]
