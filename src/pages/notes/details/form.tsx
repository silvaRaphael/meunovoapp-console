import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "../../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { SubmitButton } from "../../../components/shared/submit-button";
import { toast } from "../../../components/ui/toast/use-toast";
import { HandleRequest } from "../../../lib/handle-request";
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
        const { onDone, onError } = await new HandleRequest(data).post("https://jsonplaceholder.typicode.com/users");
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
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Note title" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Note Content" className="resize-none" rows={10} {...field} />
                                </FormControl>
                                <FormDescription>Describe the note</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-x-2 flex justify-end">
                        <Button variant="ghost" onClick={() => setNote(null)}>
                            Cancel
                        </Button>
                        <SubmitButton label="Update Note" type="submit" state={form.formState.isSubmitting ? "loading" : "initial"} />
                    </div>
                </div>
            </form>
        </Form>
    );
}
