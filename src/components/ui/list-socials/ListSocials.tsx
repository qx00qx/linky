import React from 'react';
import styles from './ListSocials.module.scss';
import { Link } from 'react-router-dom';
import { SocialElement } from '../../../@types/socialElement';
import { RiFacebookBoxFill, 
  RiTiktokFill,
  RiGithubFill,
  RiSoundcloudLine,
  RiTwitterLine  } from "react-icons/ri";

type ListSocialsProps = {
    socialMedia?: SocialElement[]
}

const ListSocials: React.FC<ListSocialsProps> = ({socialMedia}) => {

    const iconMap: { [key: string]: JSX.Element } = {
        "twitter": <RiTwitterLine size={26}/>,
        "github": <RiGithubFill size={26}/>,
        "soundcloud": <RiSoundcloudLine size={26} />,
        "facebook": <RiFacebookBoxFill size={26} />,
        "tiktok": <RiTiktokFill size={26} />
      }
      
    return (
        <ul className={styles.socials}>
           {socialMedia?.map((item) => (
                <li className={styles.icon} key={item.url}>
                  <Link to={item.url}>
                    {iconMap[item.type]}
                  </Link>
                </li>
            ))}
        </ul>
    );
}

export default ListSocials;
