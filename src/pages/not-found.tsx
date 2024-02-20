import { Link } from 'react-router-dom'

import { Button } from 'components/ui/button'
import { useLanguage } from 'components/shared/language-provider'
import { Page } from 'components/shared/page'

export function NotFound() {
  const { writeLang } = useLanguage()

  document.title = '404 - Console | MeuNovoApp'

  return (
    <Page pathname={window.location.pathname}>
      <div className="flex justify-center items-center flex-1">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-medium">
            {writeLang([
              ['en', 'Page not found'],
              ['pt', 'Página não encontrada']
            ])}
          </h1>
          <Button asChild>
            <Link to="/">
              {writeLang([
                ['en', 'Back to console'],
                ['pt', 'Voltar ao console']
              ])}
            </Link>
          </Button>
        </div>
      </div>
    </Page>
  )
}
