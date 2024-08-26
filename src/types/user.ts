import { userSocialLink } from "./socialLink";

export type User = {
    email: string | null;
    id: string;
    username: string | null;
    picture?: any;
    socialsLinks?: userSocialLink[]
}