import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { SubmitButton } from "../../../components/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { Mod } from "../../../mod/handle-request";
import { Note } from "../data/note";

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

export function NoteForm({ note, setNote }: { note: Note; setNote: (value: React.SetStateAction<Note | null>) => void }) {
    const form = useForm<NoteFormValues>({
        resolver: zodResolver(noteFormSchema),
        defaultValues: {
            title: note.title,
            description: note.description,
        },
        mode: "onChange",
    });

    async function onSubmit(data: NoteFormValues) {
        const { onDone, onError } = await new Mod(data).post("https://jsonplaceholder.typicode.com/users");
        onDone(() => {
            toast({
                variant: "success",
                title: "Note updated successfully!",
            });
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
                            <CardTitle className="text-3xl group-hover:text-neutral-50 group-hover:dark:text-neutral-950">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormControl>
                                                <Input placeholder="Note title" {...field} className="text-3xl h-14 bg-transparent" />
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
                                            <Textarea placeholder="Note Content" className="bg-transparent resize-none" rows={10} {...field} />
                                        </FormControl>
                                        <FormDescription>Describe the note</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </div>
                    <CardFooter className="space-x-2">
                        <Button variant="ghost" onClick={() => setNote(null)}>
                            Cancel
                        </Button>
                        <SubmitButton label="Update Note" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
