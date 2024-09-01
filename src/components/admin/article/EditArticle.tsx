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
import { Value } from "@udecode/plate-common";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react";
import { ArticleEditor } from "./ArticleEditor";
import { useExtractTextFromContent } from "@/hooks/useExtractTextFromContent";
import { useParams } from "react-router-dom";
import { Article } from "@/models/Article";
import { useIsValidImageUrl } from "@/hooks/useIsValidImageUrl";

export function EditArticle(){
    const { t } = useTranslation();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [isArticleLoaded, setIsArticleLoaded] = useState<boolean>(false);
    const [article, setArticle] = useState<Article>();
    const [contentJson, setContentJson, contentHtml] = useEditor();
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
          content: "",
          imageUrl: "",
        },
    })

    useEffect(() => {
        fetch(`http://api.blog.mcastel.fr/api/articles/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log("data",data.data)

            const articleData = data.data;

            setArticle(articleData);

            setContentJson(JSON.parse(articleData.content) as Value);
        
            form.setValue("title", articleData.title);
            form.setValue('description', articleData.description);
            form.setValue('content', articleData.content);
            form.setValue('imageUrl', articleData.imageUrl);

            setIsArticleLoaded(true);
        })
    }, [])

    if (!isArticleLoaded && !article) return

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("data",data)
        setLoading(true);

        fetch("http://api.blog.mcastel.fr/api/articles/"+id, {
            method: 'PUT',
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

            if (response.success && response.status === 200) {
                toast.success(t('article.createOrEdit.editToast.success.title'));
            }
            else {
                toast.error(t('article.createOrEdit.editToast.error.title'))
            }
        })
        .catch(() => toast.error(t('article.createOrEdit.editToast.error.title')))
    }    

    return (
        <div className="py-8">
            <h1 className="text-2xl font-semibold text-center mb-8">
                {t('article.createOrEdit.edit', { title: article?.title })}
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
                                                initialValue={JSON.parse(contentJson) as Value}
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
                                {t('article.createOrEdit.editBtn')}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
