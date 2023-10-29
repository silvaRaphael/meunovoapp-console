import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { SubmitButton } from "../../components/submit-button";
import { toast } from "../../components/ui/toast/use-toast";
import { Mod } from "../../mod/handle-request";
import { User } from "../../config/user";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

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

    async function onSubmit(data: ProfileFormValues) {
        const { onDone, onError } = await new Mod(data).post("https://jsonplaceholder.typicode.com/users");
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
                    <div className="grid grid-cols-9 gap-x-4">
                        <div className="col-span-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Gender</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={"ok"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {["feminine", "masculine"].map((gender, i) => (
                                                        <SelectItem key={i} value={`${gender}`}>
                                                            {gender}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-4">
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Avatar</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Pick a photo"
                                                type="file"
                                                className="file:text-neutral-800 dark:file:text-neutral-100 file:border-r file:border-neutral-200 file:h-full file:me-2"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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
                    <SubmitButton label="Update Profile" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
                </div>
                <Card className="w-full h-min">
                    <CardHeader>
                        <Avatar className="h-24 w-24 mx-auto">
                            <AvatarImage src={user.avatar} alt={`@${user.username}`} />
                            <AvatarFallback>{[user.name.charAt(0), user.lastName.charAt(0)].join("").toUpperCase()}</AvatarFallback>
                        </Avatar>
                    </CardHeader>
                    <CardContent className="space-y-1">
                        <div className="flex flex-col space-y-1 items-center">
                            <p className="text-sm text-center font-medium leading-none">@{user.username}</p>
                            <p className="text-xs text-center leading-none text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex flex-col space-y-1 items-center">
                            <p className="text-sm text-center font-medium leading-none">{user.role}</p>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}
