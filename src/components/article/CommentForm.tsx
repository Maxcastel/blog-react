import { useEditor } from "@/hooks/useEditor";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Value } from "@udecode/plate-common";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"
import { renderToString } from 'react-dom/server';
import { CommentEditor } from "./CommentEditor";
import { Article } from "@/models/Article";
import { useExtractTextFromContent } from "@/hooks/useExtractTextFromContent";

export function CommentForm({article}:{article: Article}){
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();
    const { extractTextFromContent } = useExtractTextFromContent();

    const formSchema = z.object({
        content: z
            .string({required_error: t('comment.editor.empty')})
            .refine(value => {
                const textContent = extractTextFromContent(value);
                return textContent.length >= 2;
            }, {message: t('comment.editor.error')}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        },
    }) 

    function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);

        fetch("http://api.blog.mcastel.fr/api/comments", {
            method: 'POST',
            body: JSON.stringify({
                content: data.content,
                articleId: article.id,
                userId: 2,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(response => {
            setLoading(false);
            if (response.success && response.status === 201){
                toast.success(t('comment.sendingMessage'));
            }
            else{
                toast.error(t('comment.sendingError'));
            }
        })
        .catch(() => toast.error(t('comment.sendingError')))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <CommentEditor
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="space-x-2">
                        <Button disabled={loading} type="submit">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {t('contact.btn')}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}