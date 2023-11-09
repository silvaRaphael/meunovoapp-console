import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Project } from "../data/project";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import format from "date-fns/format";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "../../../components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../../components/ui/command";
import { useEffect, useState } from "react";
import { Member } from "../../members/data/member";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Actions } from "../../../components/actions";
import { Team } from "../../teams/data/team";
import { HandleRequest } from "../../../lib/handle-request";
import { Separator } from "../../../components/ui/separator";
import { useLanguage } from "../../../components/language-provider";
import { languages } from "../../../config/languages";

const projectFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters.",
        })
        .max(50, {
            message: "Title must not be longer than 100 characters.",
        }),
    manager: z
        .string({
            required_error: "Please select a manager to display.",
        })
        .uuid()
        .optional(),
    teams: z.array(
        z
            .string({
                required_error: "Please select member(s) to display.",
            })
            .uuid(),
    ),
    description: z.string().min(4),
    due: z.date({
        required_error: "Please select the due date",
    }),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export function ProjectForm({ project }: { project: Project }) {
    const { language, writeLang } = useLanguage();
    const locale = languages.find((item) => item.lang === language.lang)?.dateLocale;

    const [members, setMembers] = useState<Member[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);

    const form = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            title: project.title,
            description: project.description,
            manager: project.manager.id,
            teams: project.teams.map((item) => item.id),
            due: new Date(project.due),
        },
        mode: "onChange",
    });

    function getMembers() {
        fetch("/api/members.json")
            .then((res) => res.json())
            .then((res) => {
                setMembers(res);
            });
    }

    function getTeams() {
        fetch("/api/teams.json")
            .then((res) => res.json())
            .then((res) => {
                setTeams(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getMembers();
        getTeams();

        return () => {
            controller.abort();
        };
    }, []);

    async function onSubmit(data: ProjectFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() =>
            toast({
                variant: "success",
                title: "Project updated successfully!",
            }),
        );
        onError(() =>
            toast({
                variant: "destructive",
                title: "An error occured!",
            }),
        );
    }

    return (
        <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Project"],
                                ["pt", "Projeto"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change project info"],
                                ["pt", "Alterar informações do projeto"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Project title"],
                                            ["pt", "Título do projeto"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            placeholder={
                                                writeLang([
                                                    ["en", "Project title"],
                                                    ["pt", "Título do projeto"],
                                                ]) as string
                                            }
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Project description"],
                                            ["pt", "Descrição do projeto"],
                                        ])}
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea
                                            placeholder={
                                                writeLang([
                                                    ["en", "Describe the project"],
                                                    ["pt", "Descreva o projeto"],
                                                ]) as string
                                            }
                                            className="resize-none"
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="due"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Due date"],
                                            ["pt", "Prazo de entrega"],
                                        ])}
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal bg-muted/50", !field.value && "text-muted-foreground")}>
                                                    {field.value ? (
                                                        format(new Date(field.value), "PPP", {
                                                            locale: locale,
                                                        })
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                defaultMonth={new Date(field.value)}
                                                selected={new Date(field.value)}
                                                onSelect={field.onChange}
                                                initialFocus
                                                locale={locale}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Manager"],
                                ["pt", "Responsável"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change manager"],
                                ["pt", "Alterar responsável"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="manager"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormDescription>
                                        {writeLang([
                                            ["en", "Manager"],
                                            ["pt", "Responsável"],
                                        ])}
                                    </FormDescription>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" role="combobox" className={cn("justify-between bg-muted/50", !field.value && "text-muted-foreground")}>
                                                    <span className="text-left leading-4">
                                                        {field.value
                                                            ? members.filter((member) => field.value === member.id).map((item) => `${item.name} ${item.lastName}`)
                                                            : writeLang([
                                                                  ["en", "Search member"],
                                                                  ["pt", "Procurar membro"],
                                                              ])}
                                                    </span>
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput
                                                    placeholder={
                                                        writeLang([
                                                            ["en", "Search member..."],
                                                            ["pt", "Procurar membro..."],
                                                        ]) as string
                                                    }
                                                />
                                                <CommandEmpty>
                                                    {writeLang([
                                                        ["en", "No member found."],
                                                        ["pt", "Nenhum membro encontrado."],
                                                    ])}
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {members.map((member, i) => (
                                                        <CommandItem
                                                            value={member.name}
                                                            key={i}
                                                            onSelect={() => {
                                                                form.setValue("manager", form.getValues().manager !== member.id ? member.id : undefined);
                                                            }}
                                                        >
                                                            <CheckIcon className={cn("mr-2 h-4 w-4", field.value === member.id ? "opacity-100" : "opacity-0")} />
                                                            {`${member.name} ${member.lastName}`}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">
                            {writeLang([
                                ["en", "Teams"],
                                ["pt", "Times"],
                            ])}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {writeLang([
                                ["en", "Change teams"],
                                ["pt", "Alterar times"],
                            ])}
                        </p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="teams"
                            render={({ field }) => (
                                <div className="space-y-4">
                                    <FormItem className="flex flex-col">
                                        <FormDescription>
                                            {writeLang([
                                                ["en", "Teams"],
                                                ["pt", "Times"],
                                            ])}
                                        </FormDescription>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn("justify-between bg-muted/50", !field.value && "text-muted-foreground")}
                                                    >
                                                        <span className="text-left leading-4">
                                                            {writeLang([
                                                                ["en", "Select teams..."],
                                                                ["pt", "Selecione os times..."],
                                                            ])}
                                                        </span>
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput
                                                        placeholder={
                                                            writeLang([
                                                                ["en", "Search teams..."],
                                                                ["pt", "Procurar times..."],
                                                            ]) as string
                                                        }
                                                    />
                                                    <CommandEmpty>
                                                        {writeLang([
                                                            ["en", "No teams found."],
                                                            ["pt", "Nenhum time encontrado."],
                                                        ])}
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {teams.map((team, i) => (
                                                            <CommandItem
                                                                value={team.name}
                                                                key={i}
                                                                onSelect={() => {
                                                                    let selectedMembers = form.getValues().teams;
                                                                    if (selectedMembers.includes(team.id)) {
                                                                        selectedMembers = selectedMembers.filter((item) => item !== team.id);
                                                                    } else {
                                                                        selectedMembers.push(team.id);
                                                                    }
                                                                    form.setValue("teams", selectedMembers);
                                                                }}
                                                            >
                                                                <CheckIcon className={cn("mr-2 h-4 w-4", field.value.includes(team.id) ? "opacity-100" : "opacity-0")} />
                                                                {team.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                    <div className="space-y-2">
                                        <div className="max-h-[50vh] overflow-y-auto vertical-scrollbar space-y-2 pe-2">
                                            {!!form.getValues().teams && (
                                                <>
                                                    {teams
                                                        .filter((item) => form.getValues().teams.includes(item.id))
                                                        .map((item: Team, i) => (
                                                            <div key={i} className="flex justify-between items-center group">
                                                                {item.name}
                                                                <Actions.Remove
                                                                    className="w-6 h-6 invisible group-hover:visible"
                                                                    onClick={() => {
                                                                        let selectedMembers = form.getValues().teams;
                                                                        selectedMembers = selectedMembers.filter((selectedItem) => selectedItem !== item.id);
                                                                        form.setValue("teams", selectedMembers);
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    {!teams.filter((item) => form.getValues().teams.includes(item.id)).length && (
                                                        <p className="text-xs font-medium text-muted-foreground p-2 py-3">
                                                            {writeLang([
                                                                ["en", "No teams yet."],
                                                                ["pt", "Nenhum time ainda."],
                                                            ])}
                                                        </p>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton
                    label={
                        writeLang([
                            ["en", "Update Project"],
                            ["pt", "Atualizar Projeto"],
                        ]) as string
                    }
                    type="submit"
                    state={form.formState.isSubmitting ? "loading" : "initial"}
                />
            </form>
        </Form>
    );
}
