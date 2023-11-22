import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { SubmitButton } from "../../components/shared/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { HandleRequest } from "../../lib/handle-request";
import { User } from "../../config/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Separator } from "../../components/ui/separator";
import { UpperFirst } from "../../lib/helper";

const profileFormSchema = z.object({
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
    gender: z.string({
        required_error: "Please select a gender to display.",
    }),
    role: z.string({
        required_error: "Please select a role to display.",
    }),
    avatar: z.any().optional(),
    bio: z.string().max(160).min(4).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

let usernameTimeout: any;

export function ProfileForm({ user }: { user: User }) {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            username: user.username,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            gender: user.gender,
            role: user.role,
            // avatar: user.avatar,
        },
        mode: "onChange",
    });

    async function checkUsernameAvailability(e: React.ChangeEvent<HTMLInputElement>) {
        const username = e.target.value;

        const { onDone, onError } = await new HandleRequest({ username }).get("https://jsonplaceholder.typicode.com/users");
        onDone(() => {
            if (username.trim() === "existent") form.setError("username", { message: "Username not available" });
        });
        onError(() =>
            toast({
                variant: "destructive",
                title: "It was not possible to check username availability!",
            }),
        );
    }

    async function onSubmit(data: ProfileFormValues) {
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() =>
            toast({
                variant: "success",
                title: "Profile updated successfully!",
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
                        <h3 className="font-semibold leading-4">Name</h3>
                        <p className="text-sm text-muted-foreground">Change your name</p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
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
                                    <FormControl>
                                        <Input placeholder="Your last name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">Username</h3>
                        <p className="text-sm text-muted-foreground">Change your username</p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="Your username"
                                            onChange={(e) => {
                                                if (e.target.value.includes(" ")) e.target.value = e.target.value.replaceAll(" ", "");
                                                field.onChange(e);
                                                clearTimeout(usernameTimeout);
                                                usernameTimeout = setTimeout(() => checkUsernameAvailability(e), 500);
                                            }}
                                            name={field.name}
                                            value={field.value}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <div className="grid grid-cols-12">
                    <div className="col-span-3">
                        <h3 className="font-semibold leading-4">Info</h3>
                        <p className="text-sm text-muted-foreground">Change your informations</p>
                    </div>
                    <div className="col-span-6 space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input placeholder="Your email" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter your email</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={"ok"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["feminine", "masculine"].map((gender, i) => (
                                                    <SelectItem key={i} value={`${gender}`}>
                                                        {UpperFirst(gender)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormDescription>Pick your gender</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="Pick a photo"
                                            type="file"
                                            lang="en"
                                            className="file:text-neutral-800 dark:file:text-neutral-100 file:border-r file:border-neutral-200 file:h-full file:me-2"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Upload your avatar image</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" rows={5} {...field} />
                                    </FormControl>
                                    <FormDescription>This will be shown in your profile</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Separator />
                <SubmitButton label="Update Profile" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
            </form>
        </Form>
    );
}
