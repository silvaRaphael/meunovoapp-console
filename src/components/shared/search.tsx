import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useLanguage } from "./language-provider";

export function Search({ placeholder }: { placeholder?: string }) {
  const { writeLang } = useLanguage();

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={
          placeholder ??
          (writeLang([
            ["en", "Search"],
            ["pt", "Procurar"],
          ]) as string)
        }
        className="md:w-[100px] lg:w-[300px] pl-8"
      />
      <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
