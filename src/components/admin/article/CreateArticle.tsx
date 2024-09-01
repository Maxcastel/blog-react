import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEditor } from "@/hooks/useEditor";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { Value } from "@udecode/plate-common";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"
import { useState } from "react";
import { ArticleEditor } from "./ArticleEditor";
import { useExtractTextFromContent } from "@/hooks/useExtractTextFromContent";
import { useIsValidImageUrl } from "@/hooks/useIsValidImageUrl";

const initialValue = [
    {
      id: '1',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, World!' }],
    },
    {
      id: '2',
      type: ELEMENT_PARAGRAPH,
      children: [{ text: 'Hello, test!' }],
    }
];

export function CreateArticle(){
    const { t } = useTranslation();
    const [loading, setLoading] = useState<boolean>(false);
    const [contentJson, setContentJson, contentHtml] = useEditor(initialValue);
    const { extractTextFromContent } = useExtractTextFromContent();
    const { isValidImageUrl } = useIsValidImageUrl();

    const formSchema = z.object({
        title: z
            .string()
            .min(1, {message: t('article.createOrEdit.empty.title')})
            .min(5, {message: t('article.createOrEdit.error.title')}),
        description: z
            .string()
            .min(1, {message: t('article.createOrEdit.empty.description')})
            .min(5, {message: t('article.createOrEdit.error.description')}),
        content: z
            .string()
            .refine(value => {
                const textContent = extractTextFromContent(value);
                return textContent.length >= 1;
            }, {message: t('article.createOrEdit.empty.content')})
            .refine(value => {
                const textContent = extractTextFromContent(value);
                return textContent.length >= 10;
            }, {message: t('article.createOrEdit.error.content')}),
        imageUrl: z
            .string()
            .min(1, {message: t('article.createOrEdit.empty.imageUrl')})
            .url({message: t('article.createOrEdit.error.imageUrl')})
            .refine(async value => {
                const isValid = await isValidImageUrl(value);
                return isValid;
            }, {message: t('article.createOrEdit.error.image')}),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
          description: "",
          content: JSON.stringify(initialValue),
          imageUrl: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("data",data)
        setLoading(true);

        fetch("http://api.blog.mcastel.fr/api/articles", {
            method: 'POST',
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                content: data.content,
                imageUrl: data.imageUrl,
                userId: 2
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(response => {
            setLoading(false);

            if (response.success && response.status === 201) {
                toast.success(t('article.createOrEdit.createToast.success.title'));
            }
            else {
                toast.error(t('article.createOrEdit.createToast.error.title'))
            }
        })
        .catch(() => toast.error(t('article.createOrEdit.createToast.error.title')))
    }    

    return (
        <div className="py-8">
            <h1 className="text-2xl font-semibold text-center mb-8">
                {t('article.createOrEdit.create')}
            </h1>

            <Toaster />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="grid">
                                    <FormLabel className="text-base">{t('article.createOrEdit.title')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('article.createOrEdit.placeholder.title')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="grid">
                                    <FormLabel className="text-base">{t('article.createOrEdit.description')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('article.createOrEdit.placeholder.description')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="grid">
                                    <FormLabel className="text-base">{t('article.createOrEdit.imageUrl')}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={t('article.createOrEdit.placeholder.imageUrl')} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem className="grid">
                                        <FormLabel className="font-medium text-base">
                                            {t('article.createOrEdit.content')}
                                        </FormLabel>
                                        <FormControl>
                                            <ArticleEditor
                                                initialValue={initialValue}
                                                onWrite={(newJson:Value) => setContentJson(newJson)}
                                                onValueChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                            <div className='mt-8'>
                                <p className='font-medium text-base mb-6'>{t('article.createOrEdit.json')}</p>
                                <code className='text-base'>
                                    {contentJson}
                                </code>
                            </div>
                            <div className='mt-8'>
                                <p className='font-medium text-base mb-6'>{t('article.createOrEdit.preview')}</p>
                                <div className='border border-primary w-full px-[50px] py-16'>
                                    {contentHtml}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button disabled={loading} type="submit">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t('article.createOrEdit.createBtn')}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
