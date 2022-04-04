// Convert dd-mm-yyyy to js date type
export const convertDateToJs = (date: string): Date => {
    const datePattern = /^(\d{2})-(\d{2})-(\d{4})$/;
    const [full, day, month, year] = datePattern.exec(date);
    return new Date(`${month}, ${day} ${year}`);
}

// Convert JS date into readable date (dd-mm-yyyy)
export const convertDateToReadable = (date: string): string => {
    return new Date(date).toLocaleDateString().replace(/\//g, '-');
}

export const isDueDateExpired = (dueDate: string): boolean => convertDateToJs(dueDate) < new Date();