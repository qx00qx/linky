import { ref, uploadBytes, getDownloadURL, deleteObject } from "@firebase/storage"
import { db, storage } from "./../firebase"
import { updateProfile, User} from "firebase/auth"
import { deleteField, doc, updateDoc } from "firebase/firestore";


/* Storage */

export const upload = async (file: File, currentUser: User) => {

        const fileRef = ref(storage, `/profilePicture/${currentUser.email}/${file.name}`)

        const snapshot = await uploadBytes(fileRef, file)
        const photoURL = await getDownloadURL(snapshot.ref)

        await updateProfile(currentUser, { photoURL })
        return photoURL
};

export const deleteFile = async (filePath: string) => {
  const fileRef = ref(storage, filePath)
  await deleteObject(fileRef)
}

/* Firestore */

export const removeFieldFromDB = async (fieldName: string, userId: string) => {
  const userRef = doc(db, 'users', userId)

  await updateDoc(userRef, {
    [fieldName]: deleteField()
  });
}