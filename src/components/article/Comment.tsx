import { useEditor } from "@/hooks/useEditor";
import { useTranslation } from "react-i18next";
import { Comment as IComment } from "@/models/Comment";
import { useEffect } from "react";
import { Value } from "@udecode/plate-common";

export function Comment({comment}:{comment: IComment}){
    const { t } = useTranslation();
    const [_, setContentJson, contentHtml] = useEditor();

    useEffect(() => {
        setContentJson(JSON.parse(comment.content) as Value);
    }, [])
    

    return (
        <li className="border-b border-gray-200 dark:border-gray-600 pb-2 pt-4">
            <p className="font-semibold">
                {comment.user.firstName} {comment.user.lastName}
            </p>
            <p className="text-sm text-gray-500">
                {t('comment.posted', { 
                    date: new Date(comment.createdAt).toLocaleDateString('fr-FR'), 
                    time: new Date(comment.createdAt).toLocaleTimeString('fr-FR') 
                })}
            </p>
            <div className="py-2">
                {contentHtml}
            </div>
        </li>
    )
}