import { Link } from "react-router-dom";

import { Button } from "components/ui/button";
import { useLanguage } from "components/shared/language-provider";

export function NotFound() {
  const { writeLang } = useLanguage();

  document.title = `404 - Console | MeuNovoApp`;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-medium">
          {writeLang([
            ["en", "Page not found"],
            ["pt", "Página não encontrada"],
          ])}
        </h1>
        <Button asChild>
          <Link to="/">
            {writeLang([
              ["en", "Back to console"],
              ["pt", "Voltar ao console"],
            ])}
          </Link>
        </Button>
      </div>
    </div>
  );
}
