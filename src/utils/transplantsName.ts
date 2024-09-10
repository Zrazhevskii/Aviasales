const transplantsName = (num: number): string => {
    let value: string;
    switch (num) {
        case 0:
            value = 'Без пересадок';
            return value;
        case 1:
            value = '1 пересадка';
            return value;
        default:
            if (num > 1 && num < 5) {
                value = `${num} пересадки`;
                return value;
            }
            value = `${num} пересадок`;
    }
    return value;
};

export default transplantsName;
