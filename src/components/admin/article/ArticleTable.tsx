import { Article } from "@/models/Article";
import { useTranslation } from "react-i18next";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Icons } from '@/components/icons';
import { Link } from "react-router-dom";


export function ArticleTable({articles}:{articles: Article[]}){
    const { t } = useTranslation();

    const deleteArticle = (id:number) => {
        fetch(`http://api.blog.mcastel.fr/api/articles/${id}`, { 
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            if (response.success && response.status === 200) {
                window.location.reload();
            }
        })
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>{t("articleTable.title")}</TableHead>
                    <TableHead>{t("articleTable.author")}</TableHead>
                    <TableHead>{t("articleTable.creationDate")}</TableHead>
                    <TableHead>{t("articleTable.editDate")}</TableHead>
                    <TableHead>{t("articleTable.comment")}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {articles.map((article) => (
                    <TableRow key={article.id}>
                        <TableCell className="font-medium">{article.id}</TableCell>
                        <TableCell>{article.title}</TableCell>
                         <TableCell>
                            {article.user.firstName} {article.user.lastName}
                        </TableCell>
                        <TableCell>
                            {(new Date(article.creationDate)).toLocaleDateString('fr-FR')} {(new Date(article.creationDate)).toLocaleTimeString('fr-FR')}
                        </TableCell>
                        <TableCell>
                            {article.lastUpdate ?
                                (new Date(article.lastUpdate)).toLocaleDateString('fr-FR') +" "+ (new Date(article.lastUpdate)).toLocaleTimeString('fr-FR')
                            : "null"}
                            </TableCell>
                        <TableCell>
                            {article.comments.length}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2.5">
                                <Link to={`/admin/articles/${article.link}`} >
                                    <Icons.viewing className="h-6 w-6 text-blue-700 hover:text-blue-800 cursor-pointer" />
                                </Link>
                                <Link to={`/admin/articles/${article.id}/edit`}>
                                    <Icons.editing className="h-6 w-6 text-primary hover:text-primary/75 cursor-pointer" />
                                </Link>
                                <Icons.delete2 
                                    className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer" 
                                    onClick={() => deleteArticle(article.id)}
                                 />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter className="bg-transparent">
                <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={8} className="pb-0 font-normal">
                        {articles.length} articles
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}