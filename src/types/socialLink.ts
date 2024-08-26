export type SocialName = 'github' | 'tiktok' | 'youtube' | 'soundcloud' | 'twitter' | 'twitch';

export type socialLink = {
    icon?: JSX.Element
    id: number,
    name: SocialName
}

export type userSocialLink = {
    name: SocialName
    url: string
}