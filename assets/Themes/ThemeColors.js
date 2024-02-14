export const themeColors = {
    mainSelectedColor : "#8000FF"
}

export const playBtnColor = (name) => {
    if(name === "Nets"){
        return {main: '#000000', shadow: '#6b726b'}
    } else if(name === "Celtics"){
        return {main: '#12b411', shadow: '#007a34'}
    } else {
        return {main: 'orange', shadow: 'yellow'}
    }
}