import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Mod } from "../../../mod/handle-request";
import { Note } from "../data/note";
import { user } from "../../../config/user";

const noteFormSchema = z.object({
    title: z
        .string()
        .min(2, {
            message: "Title must be at least 2 characters.",
        })
        .max(50, {
            message: "Title must not be longer than 100 characters.",
        }),
    description: z.string().optional(),
});

type NoteFormValues = z.infer<typeof noteFormSchema>;

export function CreateNoteForm({
    notes,
    setNotes,
    setNote,
}: {
    notes: Note[];
    setNotes: (value: React.SetStateAction<Note[]>) => void;
    setNote: (value: React.SetStateAction<Note | null>) => void;
}) {
    const form = useForm<NoteFormValues>({
        resolver: zodResolver(noteFormSchema),
        mode: "onChange",
    });

    async function onSubmit(data: NoteFormValues) {
        const { onDone, onError } = await new Mod(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() => {
            toast({
                variant: "success",
                title: "Note created successfully!",
            });
            form.reset({
                title: "",
                description: "",
            });
            setNotes([
                {
                    ...data,
                    id: notes.length.toString(),
                    member: user,
                    createdAt: new Date(),
                },
                ...notes,
            ]);
            setNote(null);
        });
        onError(() =>
            toast({
                variant: "destructive",
                title: "An error occured!",
            }),
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full flex flex-col">
                    <div>
                        <CardHeader>
                            <CardTitle className="text-3xl">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <Input placeholder="Note title" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea placeholder="Note Content" className="resize-none" rows={3} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </div>
                    <CardFooter>
                        <SubmitButton label="Create Note" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} className="w-full" />
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
