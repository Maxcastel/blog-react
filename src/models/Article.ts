import { Comment } from "./Comment";
import { User } from "./User";

export interface Article {
    id: number;
    title: string;
    description: string;
    content: string
    link: string;
    lastUpdate: Date | null;
    imageUrl: string;
    creationDate: Date;
    user: User;
    comments: Comment[];
}
  