import { Message, MessageUser } from './message'

export interface Chat {
  id: string
  user: MessageUser
  participant: MessageUser
  last_message?: Message
}
