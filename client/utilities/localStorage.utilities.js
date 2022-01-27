//grab item(s) from local storage
export const getItem = key => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    } else {
        return null
    }
}

//set items in local storage
export const setItem = (key, data) => {
    return localStorage.setItem(key, JSON.stringify(data))
}

//remove item from local storage
export const removeItem = key => {
    return localStorage.removeItem(key)
}