import { Article } from "@/models/Article";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";

export function ArticleCard({article}: {article: Article}){
    const { t } = useTranslation();

    const creationDate = new Date(article.creationDate);
    const lastUpdateDate = article.lastUpdate ? new Date(article.lastUpdate) : null;

    return (
        <Card>
            <CardHeader>
                <CardContent className="px-0 pb-3">
                    <img className="rounded-lg h-[240px] w-full object-cover" src={article.imageUrl} />
                </CardContent>
                <CardTitle>
                    {article.title}
                </CardTitle>
                <CardDescription>
                    {t("article.published", { date: creationDate.toLocaleDateString('fr-FR'), time: creationDate.toLocaleTimeString('fr-FR') })} <br />

                    {lastUpdateDate ? (
                        creationDate.toDateString() === lastUpdateDate.toDateString() ? (
                            t("article.edited_same_day", { time: lastUpdateDate.toLocaleTimeString('fr-FR') })
                        ) : (
                            t("article.edited", { date: lastUpdateDate.toLocaleDateString('fr-FR'), time: lastUpdateDate.toLocaleTimeString('fr-FR') })
                        )
                    ) : ""}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {article.description}
            </CardContent>
            <CardFooter>
                <Button asChild>
                    <a href={`/articles/${article.link}`}>
                        {t("article.read_more")}
                    </a>
                </Button>
            </CardFooter>
        </Card>
    )
}