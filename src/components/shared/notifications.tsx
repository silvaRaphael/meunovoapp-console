import { Button, buttonVariants } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Bell } from 'lucide-react'
import { Notification, notificationsIcons } from '../../config/notifications'
import { format } from 'date-fns'
import { useLanguage } from './language-provider'
import { languages } from 'config/languages'
import { cn } from 'lib/utils'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HandleRequest } from 'lib/handle-request'
import { errorToast } from './error-toast'
import { Tooltip, TooltipContent, TooltipTrigger } from 'components/ui/tooltip'

export function Notifications({
  notifications,
  setNotifications
}: {
  notifications: Notification[]
  setNotifications: React.Dispatch<React.SetStateAction<Notification[] | null>>
}) {
  const { language, writeLang } = useLanguage()

  const [open, onOpenChange] = useState<boolean>(false)
  const [time, setTime] = useState<Date | null>(null)

  async function handleMarkAsRead() {
    const request = await new HandleRequest({}).put('/notifications')

    request.onDone(() => {
      setNotifications([])
    })

    request.onError((error) => {
      errorToast(error)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    let currentTime: any

    if (open) {
      currentTime = setInterval(() => {
        setTime(new Date())
      }, 1000)
    }

    return () => {
      clearInterval(currentTime)
      setTime(null)

      controller.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const notificationsLength = notifications?.length ?? 0

  return (
    <Tooltip>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative p-2">
              <Bell size={16} />
              {notificationsLength > 0 && (
                <div className="absolute top-[4px] right-[6px] w-[5px] h-[5px] rounded-full bg-neutral-950 dark:bg-neutral-50"></div>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <DropdownMenuContent className="w-60" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {writeLang([
                  [
                    'en',
                    `Welcome, ${format(time ?? new Date(), 'pp', {
                      locale: languages.find((item) => item.lang === language.lang)?.dateLocale
                    })} now`
                  ],
                  [
                    'pt',
                    `Bem-vindo, ${format(time ?? new Date(), 'pp', {
                      locale: languages.find((item) => item.lang === language.lang)?.dateLocale
                    })} agora`
                  ]
                ])}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {!notificationsLength
                  ? writeLang([
                      ['en', "You don't have any notifications"],
                      ['pt', 'Você não tem nenhuma notificação']
                    ])
                  : writeLang([
                      ['en', `You have ${notificationsLength} notifications`],
                      [
                        'pt',
                        `Você tem ${notificationsLength} ${notificationsLength === 1 ? 'notificação' : 'notificações'}`
                      ]
                    ])}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="max-h-60 overflow-y-auto vertical-scrollbar">
            {!notificationsLength ? (
              <p className="text-xs font-medium text-muted-foreground p-2 py-3">
                {writeLang([
                  ['en', 'No notifications yet'],
                  ['pt', 'Nenhuma notificação ainda']
                ])}
              </p>
            ) : (
              notifications?.map((item: Notification, i) => {
                const child = (
                  <div className="flex items-center space-x-2 group">
                    <div
                      className={cn(
                        buttonVariants({ variant: 'secondary' }),
                        'p-0 aspect-square group-hover:bg-background'
                      )}
                    >
                      {notificationsIcons[item.type]}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium leading-none">{item.title}</span>
                      <p className="text-xs leading-none text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                )

                return (
                  <DropdownMenuItem key={i} asChild>
                    {item.link ? (
                      <Link to={item.link} className="cursor-pointer">
                        {child}
                      </Link>
                    ) : (
                      child
                    )}
                  </DropdownMenuItem>
                )
              })
            )}
          </DropdownMenuGroup>
          {notificationsLength > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleMarkAsRead}>
                <span className="text-xs mx-auto text-blue-700 dark:text-blue-500">
                  {writeLang([
                    ['en', 'Mark all as read'],
                    ['pt', 'Marcar todas como lida']
                  ])}
                </span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <TooltipContent sideOffset={14}>
        {writeLang([
          ['en', 'Notifications'],
          ['pt', 'Notificações']
        ])}
      </TooltipContent>
    </Tooltip>
  )
}
