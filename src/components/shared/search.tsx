import { Input } from "../ui/input";

export function Search({ placeholder }: { placeholder?: string }) {
    return (
        <div>
            <Input type="text" placeholder={placeholder ?? "Search..."} className="md:w-[100px] lg:w-[300px] bg-transparent" />
        </div>
    );
}
