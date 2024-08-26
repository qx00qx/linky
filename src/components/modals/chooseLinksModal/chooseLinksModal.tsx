import React, { useMemo, useState } from 'react';
import { Button,
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalCloseButton, 
     ModalBody,
     ModalFooter,
     ButtonGroup,
    } from '@chakra-ui/react';
import { db } from '@firebase-app';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks/useAppDispatch';
import { setSocialsLinks } from '@redux/slices/socialsSlice/socialsSlice';
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import ListSocials from '@components/list-socials/ListSocials';
import AddNewSocials from '@components/add-new-socials/addNewSocials';
import { addSocialsLinks, removeAllSocialsLinks } from '@redux/slices/userSlice/userSlice';
import { SocialName } from '../../../types/socialLink';

type ChooseLinksModalProps = {
    isOpen: boolean;
    onClose: () => void;
}

const ChooseLinksModal: React.FC<ChooseLinksModalProps> = ({isOpen, onClose}) => {

  const [isAddingLink, setIsAddingLink] = useState(false)
  const [currentSocialLink, setCurrentSocialLink] = useState('')

  const [socialName, setSocialName] = useState('');
  const [socialUrl, setSocialUrl] = useState('');

  const dispatch = useAppDispatch()
  const { id, socialsLinks } = useAppSelector(state => state.user)

  useMemo(() => {
    onSnapshot(collection(db, 'socials'), (snapshot) => {
      const unsub = snapshot.docs.map((doc) => ({
        id: doc.data().id,
        name: doc.data().name
      }));
      dispatch(setSocialsLinks(unsub))
    })}, [dispatch])

    const handleClickAddLink = (social: string) => {
      setIsAddingLink(true);
      setSocialName(social)
      setCurrentSocialLink(`https://${social}.com/`);
    };

    const handleSaveLink = async (id: string, name: SocialName, url: string) => {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);

      /* Получаю существующие ссылки из массива и добавляю к ним новые */
      const existingSocialsLinks = docSnap.data()?.socialsLinks || [];   
      const updatedSocialsLinks = [...existingSocialsLinks, { name, url }];

      if (!socialsLinks?.find((link) => link.name === name)) {
        dispatch(addSocialsLinks({ name, url }));
        await updateDoc(docRef, { socialsLinks: updatedSocialsLinks });

      } else {
        alert('You already have this social link');
      }
      setIsAddingLink(false);
    }

    const handleRemoveLinks = async () => {
      const docRef = doc(db, 'users', id);
      await updateDoc(docRef, {socialsLinks: []})
    }

    return (
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Choose links</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                { isAddingLink ? <AddNewSocials 
                                    label={`Your link on`}
                                    value={currentSocialLink}
                                    setSocialUrl={setSocialUrl}/> 
                                    : <ListSocials onSelectSocial={handleClickAddLink}/> }
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button
                    bg={'white'}
                    px={'26px'}
                    py={'16px'}
                    variant="outline"
                    isDisabled={!isAddingLink}
                    onClick={() => {
                      setIsAddingLink(false)
                   }}>
                    Cancel
                  </Button>
                  <Button 
                      bg={'white'}
                      px={'26px'}
                      py={'16px'}
                      isDisabled={!isAddingLink}
                      variant="outline"
                      onClick={() => {
                        {/* исправить имена socialName as SocialName */}
                        handleSaveLink(id, socialName as SocialName, socialUrl)
                        onClose()
                      }}>
                    Save
                  </Button>
                  <Button 
                      bg={'white'}
                      px={'26px'}
                      py={'16px'}
                      variant="outline"
                      isDisabled={isAddingLink}
                      onClick={() => {
                        dispatch(removeAllSocialsLinks())
                        handleRemoveLinks()
                      }}>
                    Remove All
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </ModalContent>
          </Modal>
    );
}

export default ChooseLinksModal;
