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
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { ContactEditor } from "./ContactEditor";
import { toast } from "sonner";
import { useContactEditor } from "@/hooks/useContactEditor";
import { renderToString } from 'react-dom/server';
import { useState } from "react";
import { Loader2 } from "lucide-react"

export function ContactForm(){
    const { t } = useTranslation();
    const [_, setContentJson, contentHtml] = useContactEditor();
    const [loading, setLoading] = useState<boolean>(false);

    const formSchema = z.object({
        nom: z
          .string()
          .min(1, { message: t('contact.empty.nom') })
          .min(3, { message: t('contact.error.nom') }),
        email: z
          .string()
          .min(1, { message: t('contact.empty.email') })
          .email({ message: t('contact.error.email') }),
        objet: z
          .string()
          .min(1, { message: t('contact.empty.objet') })
          .min(5, { message: t('contact.error.objet') }),
        message: z
          .string()
          .min(1, {message: t('contact.empty.message')})
          .min(10, { message: t('contact.error.message')}),
    });
      
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nom: "",
            email: "",
            objet: "",
            message: "",
        },
    }) 

    function onSubmit(data: z.infer<typeof formSchema>) {
        setLoading(true);

        fetch("http://api.blog.mcastel.fr/api/emails", {
            method: 'POST',
            body: JSON.stringify({
                name: data.nom,
                email: data.email,
                subject: data.objet,
                message: renderToString(contentHtml),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(response => {
            setLoading(false);
            if (response.status === 201){
                toast.success("Email envoyé avec succes");
            }
            else{
                toast.error("Une erreur est survenue lors de l'envoi de l'email");
            }
        })
        .catch(() => toast.error("Une erreur est survenue lors de l'envoi de l'email"))
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
                <div className="grid gap-4">
                    <FormField
                        control={form.control}
                        name="nom"
                        render={({ field }) => (
                            <FormItem className="grid">
                                <FormLabel className="text-base">{t('contact.nom')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('contact.placeholder.nom')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="grid">
                                <FormLabel className="text-base">{t('contact.email')}</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="objet"
                        render={({ field }) => (
                            <FormItem className="grid">
                                <FormLabel className="text-base">{t('contact.objet')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('contact.placeholder.objet')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="grid">
                                <FormLabel className="text-base">{t('contact.message')}</FormLabel>
                                <FormControl>
                                    <ContactEditor
                                        onWrite={(newJson:Value) => setContentJson(newJson)}
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