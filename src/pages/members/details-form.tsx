import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { toast } from "../../components/ui/toast/use-toast";
import { Member } from "../../adapters/member";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover";
import format from "date-fns/format";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Calendar } from "../../components/ui/calendar";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../../components/ui/command";
import { useEffect, useState } from "react";
import { Role } from "../../adapters/roles";
import { Card, CardContent } from "../../components/ui/card";

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
    role: z
        .string({
            required_error: "Please select a role to display.",
        })
        .uuid(),
    bio: z.string().max(160).min(4).optional(),
    since: z.date({
        required_error: "Please select the hiring date",
        description: "lbsadlçkfnasçlhjfladsjk",
    }),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

export function MemberForm({ member }: { member: Member }) {
    const [roles, setRoles] = useState<Role[]>([]);

    const form = useForm<MemberFormValues>({
        resolver: zodResolver(memberFormSchema),
        defaultValues: {
            username: member.username,
            name: member.name,
            lastName: member.lastName,
            email: member.email,
            role: member.role.id,
            bio: member.bio,
            since: member.since,
        },
        mode: "onChange",
    });

    function onSubmit(data: MemberFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    function getRoles() {
        fetch("/api/roles.json")
            .then((res) => res.json())
            .then((res) => {
                setRoles(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getRoles();

        return () => {
            controller.abort();
        };
    });

    return (
        <div className="grid grid-cols-3 gap-x-4">
            <div className="col-span-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <div className="grid grid-cols-3 gap-x-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your last name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Your username"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-x-4">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Role</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "justify-between",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value
                                                            ? roles.find(
                                                                  (role) =>
                                                                      role.id ===
                                                                      field.value,
                                                              )?.title
                                                            : "Select role"}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <Command
                                                    defaultValue={field.value}
                                                >
                                                    <CommandInput placeholder="Search role..." />
                                                    <CommandEmpty>
                                                        No role found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {roles.map(
                                                            (role, i) => (
                                                                <CommandItem
                                                                    value={
                                                                        role.title
                                                                    }
                                                                    key={
                                                                        role.id
                                                                    }
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            "role",
                                                                            role.id,
                                                                        );
                                                                    }}
                                                                    defaultChecked={
                                                                        role.id ===
                                                                        field.value
                                                                    }
                                                                >
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            role.id ===
                                                                                field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0",
                                                                        )}
                                                                    />
                                                                    {role.title}
                                                                </CommandItem>
                                                            ),
                                                        )}
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
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "pl-3 text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground",
                                                        )}
                                                    >
                                                        {field.value ? (
                                                            format(
                                                                new Date(
                                                                    field.value,
                                                                ),
                                                                "PPP",
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    defaultMonth={
                                                        new Date(field.value)
                                                    }
                                                    selected={
                                                        new Date(field.value)
                                                    }
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() ||
                                                        date <
                                                            new Date(
                                                                "1900-01-01",
                                                            )
                                                    }
                                                    initialFocus
                                                />
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
                                        <Textarea
                                            placeholder="Tell us a little bit about yourself"
                                            className="resize-none"
                                            rows={5}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This will be shown in your profile
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Update member</Button>
                    </form>
                </Form>
            </div>
            <Card>
                <CardContent></CardContent>
            </Card>
        </div>
    );
}
