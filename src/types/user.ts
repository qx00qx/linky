import { customLink } from "./customLink";
import { userSocialLink } from "./socialLink";

export type User = {
    email: string | null;
    id: string;
    username: string | null;
    bio?: string;
    picture?: string;
    socialsLinks?: userSocialLink[],
    customLinks?: customLink[]
}