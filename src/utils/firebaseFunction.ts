import { ref, uploadBytes, getDownloadURL, deleteObject } from "@firebase/storage"
import { storage } from "./../firebase"
import { updateProfile, User} from "firebase/auth"


/* Storage */

export const upload = async (file: File, currentUser: User) => {

        const fileRef = ref(storage, `/profilePicture/${currentUser.displayName}/${file.name}`)

        const snapshot = await uploadBytes(fileRef, file)
        const photoURL = await getDownloadURL(snapshot.ref)

        await updateProfile(currentUser, { photoURL })
};

export const deleteFile = (file: any, currentUser: any) => {
  // const fileType = file.type;
  // const fileExtension = fileType.split('/')[1];

  const fileRef = ref(storage, `/profilePicture/${currentUser.uid}.png`)
  deleteObject(fileRef)
}