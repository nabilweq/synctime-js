export default class Months {
    public shortMonth = (time:Date) => {
        return time.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
    }

    public monthLongDigit = (time:Date) => {
        return (time.getUTCMonth() + 1).toString().padStart(2, '0');
    }

    public longMonth = (time:Date) => {
        return time.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
    }

    public monthShortDigit = (time:Date) => {
        return time.getUTCMonth() + 1
    }
    
}