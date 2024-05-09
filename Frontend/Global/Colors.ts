export const getLevelColor = (level: number) : string => {
    if (level >= 20) {
        return '#B01BC0';
    } else if (level >= 15) {
        return '#1AD1AD';
    } else if (level >= 10) {
        return '#EAD15C';
    }
    else if (level >= 5) {
        return '#FAF9F6';
    } else {
        return '#B59773';
    }
}