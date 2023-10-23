import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
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
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Actions } from "../../../components/actions";
import { Team } from "../../teams/data/team";

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

    return (
        <Form {...form}>
            <form className="grid grid-cols-4 gap-x-4">
                <div className="col-span-3 space-y-8">
                    <div className="grid grid-cols-3 gap-x-4">
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Project Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Project title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="manager"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Manager</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                                                    <span className="text-left leading-4">
                                                        {field.value
                                                            ? members.filter((member) => field.value === member.id).map((item) => `${item.name} ${item.lastName}`)
                                                            : "Select member"}
                                                    </span>
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search member..." />
                                                <CommandEmpty>No member found.</CommandEmpty>
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
                        <div className="mt-8">
                            <FormField
                                control={form.control}
                                name="due"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Due Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
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
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" rows={5} {...field} />
                                </FormControl>
                                <FormDescription>Describe the project function</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton
                        label="Update Project"
                        onSubmit={async () => {
                            await new Promise((resolve, rejects) => {
                                setTimeout(() => {
                                    resolve(1);
                                    // rejects("An error occured!");
                                }, 1000);
                            });
                        }}
                        onError={(error: any) => {
                            toast({
                                variant: "destructive",
                                title: error || "An error occured!",
                            });
                        }}
                        onSuccess={() => {
                            toast({
                                title: "Project updated successfully!",
                            });
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <FormField
                        control={form.control}
                        name="teams"
                        render={({ field }) => (
                            <Card className="w-full">
                                <CardHeader>
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                                                        <span className="text-left leading-4">Select teams</span>
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search teams..." />
                                                    <CommandEmpty>No teams found.</CommandEmpty>
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
                                </CardHeader>
                                <CardContent className="space-y-2">
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
                                                    <p className="text-xs font-medium text-muted-foreground p-2 py-3">No teams yet</p>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}
