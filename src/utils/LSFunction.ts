
export const getUserfromLS = () => {
    const data = localStorage.getItem('userData');
    const userData = data ? JSON.parse(data) : [];

    return {
        userData
    }
}

export const removePicturefromLS = () => {
    const data = localStorage.getItem('userData');
    const userData = data ? JSON.parse(data) : [];
    
    if (userData) {
    delete userData.picture;
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}