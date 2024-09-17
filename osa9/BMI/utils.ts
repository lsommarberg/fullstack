export const isNotNumber = (argument: string): boolean => {
    const num = Number(argument);
    return Number.isNaN(num);
};
