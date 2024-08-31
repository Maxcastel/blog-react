import { Article } from "@/models/Article";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { ArticleTable } from "./ArticleTable";


export function Articles(){
    const [articles, setArticles] = useState<Article[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetch("http://api.blog.mcastel.fr/api/articles")
            .then(response => response.json())
            .then(data => setArticles(data.data));
    }, []);

    return (
        <div className="min-h-[calc(100vh-(24px+32px))] lg:min-h-[calc(100vh-(40px+32px))] pb-[10vh]">
            <div className="flex items-center justify-between">
                
                <h1 className="w-full text-4xl font-bold py-10 text-center">
                    Articles
                </h1>

                <Button asChild>
                    <a href="/article/create">
                        {t("articleTable.createArticle")}
                        <Icons.add className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
            
            <Card>
                <CardContent className="pt-6">
                    <ArticleTable articles={articles} />
                </CardContent>
            </Card>
        </div>
    )
}