export const fromEngToRus = (str) => {
    switch (str) {
        case 'monolithicBuilding':
            return 'монолитный';
        case 'brickBuilding':
            return 'кирпичный';
        case 'панельный':
            return 'панельный';
        case 'blockBuilding':
            return 'блочный';
        default:
            return '';
    }
}
