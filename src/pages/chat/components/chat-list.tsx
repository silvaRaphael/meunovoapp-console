import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { cn } from 'lib/utils'
import { Badge } from 'components/ui/badge'
import { MemberInfo } from 'components/shared/member-info'
import { languages } from 'config/languages'
import { useLanguage } from 'components/shared/language-provider'
import { Chat } from 'pages/chat/data/chat'
import { GetMessageLabel } from '../data/message'

export function ChatList({
  items,
  chat,
  setChat,
  setIsCollapsed
}: {
  items: Chat[]
  chat?: Chat | null
  setChat: React.Dispatch<React.SetStateAction<Chat | null>>
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { language, writeLang } = useLanguage()

  items = items.map((item: Chat) => {
    if (!item.last_message?.text)
      return {
        ...item,
        last_message: undefined
      }

    return item
  })

  return (
    <div
      className="h-full overflow-y-auto vertical-scrollbar"
      style={{
        height: window.screen.availHeight - 46 - 80 - 52 - 16 - 16 - 40 - 90
      }}
    >
      {items.length ? (
        <div className="flex flex-col h-full gap-2 p-2">
          {items
            .sort(
              (a, b) =>
                (b.last_message ? new Date(b.last_message?.date ?? new Date()).getTime() ?? 1 : 1) -
                (a.last_message ? new Date(a.last_message?.date ?? new Date()).getTime() ?? 1 : 1)
            )
            .map((item, i) => (
              <button
                key={i}
                className={cn(
                  'flex flex-col items-start gap-3 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent/50',
                  chat?.id === item.id && 'bg-muted/50'
                )}
                onClick={() => {
                  setChat(item)
                  setIsCollapsed(true)
                }}
              >
                <div className="flex w-full flex-col gap-1 select-none">
                  <div className="flex items-center gap-x-2">
                    <MemberInfo
                      avatar={item.participant.avatar}
                      email={item.participant.email}
                      name={item.participant.name}
                      isManager={item.participant.is_manager}
                    />
                    <div
                      className={cn(
                        'flex items-center ml-auto text-xs text-end',
                        chat?.id === item.id ? 'text-foreground' : 'text-muted-foreground'
                      )}
                    >
                      {!item.last_message?.read && <span className="flex h-2 w-2 rounded-full me-2 bg-blue-600" />}
                      {item.last_message?.date &&
                        formatDistanceToNow(new Date(item.last_message?.date), {
                          locale: languages.find((item) => item.lang === language.lang)?.dateLocale,
                          addSuffix: true
                        })}
                    </div>
                  </div>
                </div>
                {item.last_message?.text && (
                  <div className="line-clamp-2 text-xs text-muted-foreground">
                    {item.last_message?.text.substring(0, 300)}
                  </div>
                )}
                {item.last_message?.labels.length ? (
                  <div className="flex items-center gap-2">
                    {item.last_message.labels.map((label) => (
                      <Badge
                        key={label}
                        variant={chat?.id === item.id ? 'default' : 'secondary'}
                        className="pointer-events-none"
                      >
                        <GetMessageLabel messageLabel={label} />
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </button>
            ))}
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="flex justify-center items-center h-[calc(100%-52px)] p-8 text-center text-muted-foreground">
            {writeLang([
              ['en', 'No chats.'],
              ['pt', 'Nenhum chat.']
            ])}
          </div>
        </div>
      )}
    </div>
  )
}
