import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Task } from "../data/task";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import format from "date-fns/format";
import { CalendarIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Calendar } from "../../../components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput } from "../../../components/ui/command";
import { useEffect, useState } from "react";
import { Client } from "../../clients/data/client";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { statuses } from "../../projects/data/status";
import { HandleRequest } from "../../../lib/handle-request";

const taskFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters.",
        })
        .max(50, {
            message: "Title must not be longer than 100 characters.",
        }),
    description: z.string().min(4),
    client: z
        .string({
            required_error: "Please select a client to display.",
        })
        .uuid()
        .optional(),
    status: z.string(),
    priority: z.string(),
    due: z.date({
        required_error: "Please select the due date",
    }),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

export function TaskForm({ task }: { task: Task }) {
    const [clients, setClients] = useState<Client[]>([]);

    const form = useForm<TaskFormValues>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: task.name,
            description: task.description,
            // client: task.client.id,
            status: task.status,
        },
        mode: "onChange",
    });

    function getClients() {
        fetch("/api/clients.json")
            .then((res) => res.json())
            .then((res) => {
                setClients(res);
            });
    }

    useEffect(() => {
        const controller = new AbortController();

        getClients();

        return () => {
            controller.abort();
        };
    }, []);

    async function onSubmit(data: TaskFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() =>
            toast({
                variant: "success",
                title: "Task updated successfully!",
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
                    <div className="grid grid-cols-4 gap-x-4">
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Task Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Task title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="client"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Client</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant="outline" role="combobox" className={cn("justify-between bg-muted/50", !field.value && "text-muted-foreground")}>
                                                    <span className="text-left leading-4">
                                                        {/* {field.value
                                                            ? clients.filter((client) => field.value === client.id).map((item) => `${item.name} ${item.lastName}`)
                                                            : "Select client"} */}
                                                    </span>
                                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search client..." />
                                                <CommandEmpty>No client found.</CommandEmpty>
                                                <CommandGroup>
                                                    {/* {clients.map((client, i) => (
                                                        <CommandItem
                                                            value={client.name}
                                                            key={i}
                                                            onSelect={() => {
                                                                form.setValue("client", form.getValues().client !== client.id ? client.id : undefined);
                                                            }}
                                                        >
                                                            <CheckIcon className={cn("mr-2 h-4 w-4", field.value === client.id ? "opacity-100" : "opacity-0")} />
                                                            {`${client.name} ${client.lastName}`}
                                                        </CommandItem>
                                                    ))} */}
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
                            name="due"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Due Date</FormLabel>
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
                        <div className="mt-8">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Status</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="h-8">
                                                <SelectValue placeholder="Select a status" />
                                            </SelectTrigger>
                                            <SelectContent side="top">
                                                {statuses.map((status, i) => (
                                                    <SelectItem key={i} value={status}>
                                                        {status}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                    <Textarea placeholder="Describe your needs" className="resize-none" rows={5} {...field} />
                                </FormControl>
                                <FormDescription>Describe the task function</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <SubmitButton label="Update Task" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
                </div>
            </form>
        </Form>
    );
}
