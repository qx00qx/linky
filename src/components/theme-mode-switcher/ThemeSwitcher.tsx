import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { RiMoonFill, RiSunFill }from "react-icons/ri";

const ThemeSwitcher: React.FC = () => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue('dark', 'light')
    const SwicthIcon = useColorModeValue(RiMoonFill, RiSunFill)

    return (
        <IconButton
        size="md"
        fontSize="lg"
        color="currentcolor"
        marginLeft="10px"
        icon={<SwicthIcon size={25} />}
        aria-label={`Switch to ${text} mode`}
        onClick={toggleColorMode}
        variant="ghost"
        />
    );
}

export default ThemeSwitcher;
