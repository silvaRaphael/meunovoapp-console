import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Team } from "../data/team";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../../components/ui/command";
import { useEffect, useState } from "react";
import { Member } from "../../members/data/member";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { MemberInfo } from "../../../components/member-info";
import { Actions } from "../../../components/actions";
import { Mod } from "../../../mod/handle-request";

const teamFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(50, {
            message: "Name must not be longer than 50 characters.",
        }),
    manager: z
        .string({
            required_error: "Please select a manager to display.",
        })
        .uuid()
        .optional(),
    members: z.array(
        z
            .string({
                required_error: "Please select member(s) to display.",
            })
            .uuid(),
    ),
    description: z.string().max(160).min(4).optional(),
});

type TeamFormValues = z.infer<typeof teamFormSchema>;

export function TeamForm({ team }: { team: Team }) {
    const [members, setMembers] = useState<Member[]>([]);

    const form = useForm<TeamFormValues>({
        resolver: zodResolver(teamFormSchema),
        defaultValues: {
            name: team.name,
            description: team.description,
            manager: team.manager.id,
            members: team.members.map((item) => item.id),
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

    useEffect(() => {
        const controller = new AbortController();

        getMembers();

        return () => {
            controller.abort();
        };
    }, []);

    async function onSubmit(data: TeamFormValues) {
        const { onDone, onError } = await new Mod(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() =>
            toast({
                variant: "success",
                title: "Team updated successfully!",
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
            <form className="grid grid-cols-4 gap-x-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="col-span-3 space-y-8">
                    <div className="grid grid-cols-3 gap-x-4">
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Team Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Team name" {...field} />
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
                                <FormDescription>Describe the team function</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton label="Update Team" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
                </div>
                <div className="col-span-1">
                    <FormField
                        control={form.control}
                        name="members"
                        render={({ field }) => (
                            <Card className="w-full">
                                <CardHeader>
                                    <FormItem className="flex flex-col">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant="outline" role="combobox" className={cn("justify-between", !field.value && "text-muted-foreground")}>
                                                        <span className="text-left leading-4">Select members</span>
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
                                                                    let selectedMembers = form.getValues().members;
                                                                    if (selectedMembers.includes(member.id)) {
                                                                        selectedMembers = selectedMembers.filter((item) => item !== member.id);
                                                                    } else {
                                                                        selectedMembers.push(member.id);
                                                                    }
                                                                    form.setValue("members", selectedMembers);
                                                                }}
                                                            >
                                                                <CheckIcon className={cn("mr-2 h-4 w-4", field.value.includes(member.id) ? "opacity-100" : "opacity-0")} />
                                                                {`${member.name} ${member.lastName}`}
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
                                        {!!form.getValues().members && (
                                            <>
                                                {members
                                                    .filter((item) => form.getValues().members.includes(item.id))
                                                    .map((item: Member, i) => (
                                                        <div className="flex justify-between items-center group">
                                                            <MemberInfo key={i} avatar={item?.avatar} username={item?.username} name={item?.name} lastName={item?.lastName} />
                                                            <Actions.Remove
                                                                className="w-6 h-6 invisible group-hover:visible"
                                                                onClick={() => {
                                                                    let selectedMembers = form.getValues().members;
                                                                    selectedMembers = selectedMembers.filter((selectedItem) => selectedItem !== item.id);
                                                                    form.setValue("members", selectedMembers);
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                                {!members.filter((item) => form.getValues().members.includes(item.id)).length && (
                                                    <p className="text-xs font-medium text-muted-foreground p-2 py-3">No members yet</p>
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
