import { useLanguage } from 'components/shared/language-provider'

export type MessageLabel = 'support' | 'meeting' | 'important'

export const messageLabelTypes = ['support', 'meeting', 'important'] as const

export type MessageUser = {
  id?: string
  name: string
  email: string
  avatar?: string
  is_manager: boolean
  ws_token?: string
}

export interface Message {
  id: string
  chat_id: string
  user: MessageUser
  text: string
  date: Date
  read: boolean
  labels: MessageLabel[]
}

export function GetMessageLabel({ messageLabel }: { messageLabel: MessageLabel }) {
  const { writeLang } = useLanguage()

  const translatedMessageLabel = {
    support: writeLang([
      ['en', 'support'],
      ['pt', 'suporte']
    ]),
    meeting: writeLang([
      ['en', 'meeting'],
      ['pt', 'reunião']
    ]),
    important: writeLang([
      ['en', 'important'],
      ['pt', 'importante']
    ])
  }[messageLabel]

  return <>{translatedMessageLabel}</>
}
