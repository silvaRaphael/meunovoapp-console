import { Input } from "../ui/input";
import { useLanguage } from "./language-provider";

export function Search({ placeholder }: { placeholder?: string }) {
    const { writeLang } = useLanguage();

    return (
        <div>
            <Input
                type="text"
                placeholder={
                    placeholder ??
                    (writeLang([
                        ["en", "Search..."],
                        ["pt", "Procurar..."],
                    ]) as string)
                }
                className="md:w-[100px] lg:w-[300px] bg-transparent"
            />
        </div>
    );
}
