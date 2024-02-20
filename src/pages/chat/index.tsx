import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Separator } from 'components/ui/separator'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from 'components/ui/resizable-panel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs'
import { useLanguage } from 'components/shared/language-provider'
import { HandleRequest } from 'lib/handle-request'
import { Chat } from './data/chat'
import { errorToast } from 'components/shared/error-toast'
import { Message, MessageUser } from './data/message'
import { Page } from 'components/shared/page'
import { SectionHeader } from 'components/shared/section-header'
import { ContactList } from './components/contact-list'
import { ChatList } from './components/chat-list'
import { ChatDisplay } from './components/chat-display'
import { socket } from './components/websocket'
import { cn } from 'lib/utils'

export function Chats() {
  const { language, writeLang } = useLanguage()
  const navigate = useNavigate()
  const isMobile = window.screen.availWidth <= 768

  const [chats, setChats] = useState<Chat[]>([])
  const [contacts, setContacts] = useState<MessageUser[]>([])
  const [tab, setTab] = useState<string>('chats')
  const [chat, setChat] = useState<Chat | null>(null)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  async function getChats() {
    const request = await new HandleRequest().get('/chats', { language })

    request.onDone((response: Chat[]) => {
      setChats(response)

      const chatId = new URL(window.location.href).searchParams.get('chat')

      if (chatId) {
        window.history.pushState({}, '', new URL(`${window.location.origin}${window.location.pathname}`))

        const chat = response.find((item) => item.id === chatId)

        if (!chat) return

        setChat(chat)
      }

      socket.on('offlineMessage', (message: Message) => {
        response = response.map((item) => {
          if (item.id === message.chat_id) {
            return {
              ...item,
              last_message: message
            }
          }

          return item
        })

        setChats(response)
      })
    })

    request.onError((error) => {
      errorToast(error)
      if (error.redirect) navigate(error.redirect)
    })
  }

  async function getContacts() {
    const request = await new HandleRequest().get('/chats/users', { language })

    request.onDone((response) => {
      setContacts(response)
    })

    request.onError((error) => {
      errorToast(error)
      if (error.redirect) navigate(error.redirect)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    ;(() => Promise.all([getChats(), getContacts()]))()

    return () => {
      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Page
      pathname="/chat"
      header={
        <SectionHeader
          title={
            writeLang([
              ['en', `Chat (${chats.length})`],
              ['pt', `Chat (${chats.length})`]
            ]) as string
          }
        />
      }
    >
      <div className="h-[calc(100vh-88px-84px)]">
        <ResizablePanelGroup direction="horizontal">
          {(!isMobile || (isMobile && !isCollapsed)) && (
            <ResizablePanel
              defaultSize={isCollapsed ? 0 : isMobile ? 100 : 40}
              minSize={isMobile ? 0 : 40}
              collapsible={!isMobile}
              collapsedSize={isCollapsed ? 0 : isMobile ? 100 : 40}
              className={cn('border', !isMobile ? 'border-r-0 rounded-tl-md rounded-bl-md' : 'rounded-md')}
            >
              <Tabs defaultValue="chats" value={tab} onValueChange={setTab}>
                <div className="flex items-center px-2 py-2">
                  <TabsList>
                    <TabsTrigger value="chats">Chats</TabsTrigger>
                    <TabsTrigger value="contacts">
                      {writeLang([
                        ['en', 'Contacts'],
                        ['pt', 'Contatos']
                      ])}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <Separator />
                <TabsContent value="chats" className="m-0">
                  <ChatList items={chats} chat={chat} setChat={setChat} setIsCollapsed={setIsCollapsed} />
                </TabsContent>
                <TabsContent value="contacts" className="m-0">
                  <ContactList
                    items={contacts}
                    chats={chats}
                    setChat={setChat}
                    setChats={setChats}
                    setIsCollapsed={setIsCollapsed}
                    setTab={setTab}
                  />
                </TabsContent>
              </Tabs>
            </ResizablePanel>
          )}
          {!isMobile && <ResizableHandle withHandle />}
          {(!isMobile || (isMobile && isCollapsed)) && (
            <ResizablePanel
              defaultSize={isCollapsed ? 100 : isMobile ? 0 : 40}
              minSize={isMobile ? 0 : 40}
              collapsible={!isMobile}
              collapsedSize={isCollapsed ? 100 : isMobile ? 0 : 40}
              className={cn('border', !isMobile ? 'border-l-0 rounded-tr-md rounded-br-md' : 'rounded-md')}
            >
              {chat ? (
                <ChatDisplay
                  chat={chat}
                  chats={chats}
                  setChats={setChats}
                  setChat={setChat}
                  isCollapsed={isCollapsed}
                  setIsCollapsed={setIsCollapsed}
                />
              ) : (
                <div className="flex h-full flex-col">
                  <div className="flex justify-center items-center h-full p-8 text-center text-muted-foreground">
                    {writeLang([
                      ['en', 'No chat selected.'],
                      ['pt', 'Nenhum chat selecionado.']
                    ])}
                  </div>
                </div>
              )}
            </ResizablePanel>
          )}
        </ResizablePanelGroup>
      </div>
    </Page>
  )
}
