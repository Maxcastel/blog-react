import { Article } from "../../models/Article";
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";

export function Articles(){
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetch("http://api.blog.mcastel.fr/api/articles")
            .then(response => response.json())
            .then(data => setArticles(data.data));
    }, []);

    return (
        <div className="min-h-[calc(100vh-(24px+32px))] lg:min-h-[calc(100vh-(40px+32px))] pb-[10vh]">
            <h1 className="py-10 text-4xl font-bold text-center">
                Articles
            </h1>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-4 px-4">
                {articles.map(article =>
                    <ArticleCard key={article.id} 
                        article={article} 
                    />
                )}
            </div>
            
        </div>
    )
}