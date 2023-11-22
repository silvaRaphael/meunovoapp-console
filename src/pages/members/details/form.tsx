import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Member } from "../data/member";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import format from "date-fns/format";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "../../../components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../../../components/ui/command";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { JobTitle } from "../../../config/job-titles";
import { HandleRequest } from "../../../lib/handle-request";

const memberFormSchema = z.object({
    username: z
        .string()
        .min(3, {
            message: "Username must be at least 3 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(50, {
            message: "Name must not be longer than 50 characters.",
        }),
    lastName: z
        .string()
        .min(2, {
            message: "Last name must be at least 2 characters.",
        })
        .max(50, {
            message: "Last name must not be longer than 50 characters.",
        }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    jobTitle: z.array(
        z
            .string({
                required_error: "Please select a job title to display.",
            })
            .uuid(),
    ),
    bio: z.string().max(160).min(4).optional(),
    since: z.date({
        required_error: "Please select the hiring date",
    }),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

export function MemberForm({ member }: { member: Member }) {
    const [jobTitles, setJobTitles] = useState<JobTitle[]>([]);

    const form = useForm<MemberFormValues>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            username: member.username,
            name: member.name,
            lastName: member.lastName,
            email: member.email,
            jobTitle: [member.jobTitle.id],
            bio: member.bio,
            since: new Date(member.since),
        },
        mode: "onChange",
    });

    function getJobTitles() {
        fetch("/api/job-titles.json")
            .then((res) => res.json())
            .then((res) => {
                setJobTitles(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getJobTitles();

        return () => {
            controller.abort();
        };
    }, []);

    async function onSubmit(data: MemberFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() =>
            toast({
                variant: "success",
                title: "Member updated successfully!",
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
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Your username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-x-4">
                        <FormField
                            control={form.control}
                            name="jobTitle"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Job Title</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" role="combobox" className={cn("justify-between bg-muted/50", !field.value && "text-muted-foreground")}>
                                                    <span className="text-left leading-4">
                                                        {field.value.length
                                                            ? jobTitles
                                                                  .filter((jobTitle) => field.value.includes(jobTitle.id))
                                                                  .map((item) => item.name)
                                                                  .join(", ")
                                                            : "Select jobTitle"}
                                                    </span>
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search jobTitle..." />
                                                <CommandEmpty>No jobTitle found.</CommandEmpty>
                                                <CommandGroup>
                                                    {jobTitles.map((jobTitle, i) => (
                                                        <CommandItem
                                                            value={jobTitle.name}
                                                            key={jobTitle.id}
                                                            onSelect={() => {
                                                                let selectedJobTitles = form.getValues().jobTitle;
                                                                if (selectedJobTitles.includes(jobTitle.id)) {
                                                                    selectedJobTitles = selectedJobTitles.filter((item) => item !== jobTitle.id);
                                                                } else {
                                                                    selectedJobTitles.push(jobTitle.id);
                                                                }
                                                                form.setValue("jobTitle", selectedJobTitles);
                                                            }}
                                                        >
                                                            <CheckIcon className={cn("mr-2 h-4 w-4", field.value.includes(jobTitle.id) ? "opacity-100" : "opacity-0")} />
                                                            {jobTitle.name}
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
                        <FormField
                            control={form.control}
                            name="since"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Hiring Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("pl-3 text-left font-normal bg-muted/50", !field.value && "text-muted-foreground")}>
                                                    {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" defaultMonth={new Date(field.value)} selected={new Date(field.value)} onSelect={field.onChange} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" rows={5} {...field} />
                                </FormControl>
                                <FormDescription>This will be shown in your profile</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton label="Update Member" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
                </div>
                <Card className="w-full h-min">
                    <CardHeader>
                        <Avatar className="h-24 w-24 mx-auto">
                            <AvatarImage src={member.avatar} alt={`@${member.username}`} />
                            <AvatarFallback>{[member.name.charAt(0), member.lastName.charAt(0)].join("").toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="flex flex-col space-y-1 items-center">
                            <p className="text-sm text-center font-medium leading-none">@{member.username}</p>
                            <p className="text-xs text-center leading-none text-muted-foreground">{member.email}</p>
                        </div>
                        <div className="flex flex-col space-y-1 items-center">
                            <p className="text-sm text-center font-medium leading-none">{member.jobTitle.name}</p>
                            <p className="text-xs text-center leading-none text-muted-foreground">{format(new Date(member.since), "PPP")}</p>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
