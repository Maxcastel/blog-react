import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Toaster } from "sonner";
import { ContactForm } from "./ContactForm";

export function Contact(){
    const { t } = useTranslation();

    return (
        <section className="flex flex-col pb-[20vh]" id="contact">
            <h2 className="text-center text-3xl font-bold my-10">
                {t('contact.title')}
            </h2>

            <Toaster />

            <div className="flex justify-center"> 
                <Card className="w-[680px]">
                    <CardContent className="p-6">
                        <ContactForm />
                    </CardContent>
                </Card>
            </div> 

        </section>
    )
}