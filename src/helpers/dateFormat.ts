export function formatDateToISO(date: string) : string {
    const parts = date.split('.');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return year + '-' + month + '-' + day;
}

export function formatDateFromISO(date: string) : string {
    const parts = date.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    return day + '.' + month + '.' + year;
}