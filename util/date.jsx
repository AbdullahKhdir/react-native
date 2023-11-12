export function getFormattedDate(date) {
    if (date instanceof Date) {
        try {
            return date.toISOString().slice(0, 10);
        } catch (error) {
            return '';
        }
    }
}