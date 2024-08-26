import { SocialName } from "../types/socialLink";
import { RiGithubFill,
         RiTiktokFill,
         RiYoutubeFill,
         RiTwitterFill,
         RiTwitchFill,
         RiSoundcloudLine
 } from "react-icons/ri";

export const socialListIcons: Record<SocialName, {icon: JSX.Element, name: string}> = {
    'github': {
      icon: <RiGithubFill size={'26'} />,
      name: 'github',
    },
    'tiktok': {
      icon: <RiTiktokFill size={'26'} />,
      name: 'tiktok',
    },
    'youtube': {
      icon: <RiYoutubeFill size={'26'} />,
      name: 'youtube',
    },
    'soundcloud': {
      icon: <RiSoundcloudLine size={'26'} />,
      name: 'soundcloud',
    },
    'twitter': {
      icon: <RiTwitterFill size={'26'} />,
      name: 'twitter',
    },
    'twitch': {
      icon: <RiTwitchFill size={'26'} />,
      name: 'twitch',
    }
  };




