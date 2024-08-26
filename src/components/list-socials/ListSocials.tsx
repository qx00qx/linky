import React from 'react';
import { socialListIcons } from '@utils/socialListIcons';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { useAppSelector } from '@hooks/redux-hooks/useAppDispatch';

interface ListSocialsProps {
  onSelectSocial: (social: string) => void
}

const ListSocials: React.FC<ListSocialsProps> = ({onSelectSocial}) => {

  const {socialLinks} = useAppSelector((state) => state.socials)

  return (
        <ButtonGroup>
                 {socialLinks?.map((link) => {
                    const icon = socialListIcons[link.name as keyof typeof socialListIcons];
                    if (icon) {
                      return <Button key={link.id} onClick={() => onSelectSocial(link.name)}>{icon.icon}</Button>;
                    }
                    return null;
                  })}
        </ButtonGroup>
    );
}

export default ListSocials;
