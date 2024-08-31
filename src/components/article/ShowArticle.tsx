import { useEditor } from "@/hooks/useEditor";
import { Article } from "@/models/Article";
import { Value } from "@udecode/plate-common";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { CommentForm } from "./CommentForm";
import { Toaster } from "sonner";
import { Comment } from "./Comment";

export function ShowArticle(){
    const { link } = useParams();
    const [article, setArticle] = useState<Article>();
    const [loading, setLoading] = useState<boolean>(true);
    const { t } = useTranslation();
    const [_, setContentJson, contentHtml] = useEditor();

    useEffect(() => {
        fetch(`http://api.blog.mcastel.fr/api/articles/${link}`)
        .then((res) => res.json())
        .then((article) => {
            setArticle(article.data);
            setContentJson(JSON.parse(article.data.content) as Value);
            setLoading(false);
        })
    }, [])

    if (loading) return <div className="lg:min-h-[calc(100vh-(40px+32px))] min-h-[calc(100vh-(24px+32px))] pb-[10vh]"></div>

    return (
        <div className="min-h-[calc(100vh-(24px+32px))] lg:min-h-[calc(100vh-(40px+32px))] pb-[10vh]">
            {article && (
                <>
                    <h1 className="text-3xl font-bold my-4">
                        {article.title}
                    </h1>

                    <p className="text-sm text-gray-500 mb-4">
                        {t('article.author')} {article.user.firstName} {article.user.lastName} <br />
                        {t('article.published', { date: new Date(article.creationDate).toLocaleDateString('fr-FR'), time: new Date(article.creationDate).toLocaleTimeString('fr-FR') })} 

                        {article.lastUpdate && <> 
                            , {new Date(article.creationDate).toDateString() === new Date(article.lastUpdate).toDateString() ?
                                t('article.show.edited_same_day', { time: new Date(article.lastUpdate).toLocaleTimeString('fr-FR') })
                            : t('article.show.edited', { date: new Date(article.lastUpdate).toLocaleDateString('fr-FR'), time: new Date(article.lastUpdate).toLocaleTimeString('fr-FR') })}
                        </>}
                    </p>

                    <p className="text-lg mb-4 text-gray-400">
                        {article.description}
                    </p>
                    
                    <div>{contentHtml}</div>
                    
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold">
                            {t('comment.title')}
                        </h2>
                        
                        {article.comments.filter(c => c.isValid).length > 0 ? (
                            <ul>
                                {article.comments.filter(c => c.isValid).map((c) => (
                                    <Comment key={c.id} 
                                        comment={c}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p>{t('comment.noComment')}</p>
                        )}
                    </div>

                    <div className="mt-10">
                        <h2 className="text-xl font-semibold mb-2">
                            {t('comment.add')}
                        </h2>
                        
                        <p className="mb-4">{t('comment.yourComment')}</p>
                        
                        <Toaster />
                        <CommentForm article={article} />
                    </div>
                </>
            )}
        </div>
    )
}