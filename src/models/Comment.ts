import { Article } from "./Article";
import { User } from "./User";

export interface Comment {
    id: number;
    content: string;
    createdAt: Date;
    isValid: boolean;
    user: User;
    article: Article;
}
  