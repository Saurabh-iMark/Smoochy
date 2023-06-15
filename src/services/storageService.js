
const getUserToken = async () => {
  try {
    let userToken = localStorage.getItem('userToken');
        userToken = JSON.parse(userToken);

    // console.log(JSON.parse(userToken));
    // {
    //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjhjOWZhMjQwZjRlZjU0MmU3YzA0MzE0YThmMzljNmE0NTg4YTRiZGQ1OGZjYzZiM2UzY2RjZTcwNjM2MDI2MWJkNWVlNDJlNjc5MDViZDgiLCJpYXQiOjE2ODYyOTg5NTYsIm5iZiI6MTY4NjI5ODk1NiwiZXhwIjoxNzE3OTIxMzU2LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.sHYS5bdaSGJsvHpZTs1hHa4gqK2vO4dALICFvDCzeOdj4U9fN6bbg5H39yWfcbFLpzQdCZM6uxmQv7LWd6AKx6HHB6GF1e10pY1_oWrWwr4rDyS0x1JjYAigAZL7po-nelVvHTTLOtOSESAzvYgopK6okXpX1C28cMVSW0zqvl5YsEs_c31_SZuUQwAkCKK2s7NfSO2hdC4evYCE6gI619e4cNKdbEkBGpQ3HeW_H8jpJIqaHRDiD0r7illBqeJ5pBUCa1L-JFsCg9jPp7I3sST0li82aFSaV9HX2UnMRCHp3jRrdzE4YbZ-zWT3qWQvWqJp8tyHgJcXwrsLmfTX5CMcjf4F3NWRIjObttzSOizJwfMszPrj5r0ZOKMOxjnVai-zsa7N-vMYRukjDI4Civ1HafbuKzttDyRvt7nAsbUJM3UrvYs4E2KBnaY4M4XXIyt8opCnXhzrGcCwyZp2e2pdR1oKubQxccZBLCRcjZiblK5rsCXMk3mn8V4zCXbncoTZCMaKGGYPq2pqIynIX57AspVfPcJ_qJDuM0K7lkucEN5XHvWnqA9P_ZoIzyR1f_GD01_0ndJjkC-jfpaPR_rfPL8fYJBwCtvuq_0QdhGagv_d2Xn0Fq9W3JVsp_Fe-Jc3wz6IFq3ZYVk0oMBWuLKa4lc4Az0hZyrXFxGm1E0"
    // }

    // console.log(JSON.stringfy(userToken));
    // {\"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzJmNDRmYzkyM2YyNmU3YWE5Y2ZhYjg3ZmFiNmEwZmEyZGU4MDFjODQ0MzQzZjA0ZDZlMGEzZGZlYzkzZjM0ZDI1MDVhMzE1YTU4NDBhMWYiLCJpYXQiOjE2ODYyOTg4NTMsIm5iZiI6MTY4NjI5ODg1MywiZXhwIjoxNzE3OTIxMjUzLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.GNObwcuaXMTBrhFJk9i-sH0OyhLsDTJjEh9bmWuKxeARs_Ye3Bx86pfOYkI-wpf9Ut1yw_lP9rC2o8gV0Py9OrEwNCIb6PhSekh3AoePgvV1HUsJOxE8rwQ2PXu9uaHnnHT6J3janIyyQDsNr9IBV47_abSCKOr8IV1nH5r7oZqgEzi38mvnxQ8yuqawStVfGDHN_-nb8qtSc7gcDSvBEPXuuxj-VBak05TeqozwEcfDoW3zDWlgH5IaaeYiHFKa0I3RbcLWJdVI4JE9LFSuv22GZc6o3UmzNKOiP2i4j8t4T2pkq_VLuY-dQKxYU25OkcvH7mGhoSP9ouLPMM_fm-l98FxROYesPoA1hAVztOfRhdq_rNYjzTQ6oPup1EzehVlAjzuvH_baM8qkhOHJpD3pI9rpy0YRiMyMfSy4wVm8U57bpcn31xbHYWrfbWLJqDmmTr4RBQUuuTeof60M1jfZR8GOOyqLNZWCWPAc3YNhNpe5o1ub-jAn22INluwFM_L07lvUKTp4yVQe5WlUDr2tFqANGtEOtNlu6PDPKi8YOTLfahvYSeKpIiSa5wGfsbWx-PXGGOjjfhwoK9qFhXBCIgNJZ7bYbvjFYvrj8UrSY2acZb-MOh2GyyXlX4K8J8_MI6KRD_m1s0t7VKSrEvqeYBEDBfW6yTm4foej74M\"}"
    return userToken;
  } catch (error) {
    return null;
    console.log('Error retrieving data:', error);
  }
}



const setStore = async (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
    console.error('Error saving to local storage:', error);
  }
};



const getStore = async (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error retrieving from local storage:', error);
    return defaultValue;
  }
}



const removeStore = async (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
    console.error('Error removing from local storage:', error);
  }
};



const clearStore = async () => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};


export { setStore, getStore, getUserToken, removeStore, clearStore };