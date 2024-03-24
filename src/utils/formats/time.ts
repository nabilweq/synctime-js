export default class Time {
    public hours24 = (time:Date) => {
        return time.getUTCHours();
    };

    public hours = (time:Date) => {
        return time.getUTCHours() % 12 || 12;
    };

    public minutes = (time:Date) => {
        return time.getUTCMinutes();
    };

    public seconds = (time:Date) => {
        return time.getUTCSeconds();
    };

    public ampm = (time:Date) => {
        const ampm = time.getUTCHours();
        return ampm < 12 ? 'am' : 'pm';
    };

    public ampmCaps = (time:Date) => {
        const ampm = time.getUTCHours();
        return ampm < 12 ? 'AM' : 'PM';
    };
    
}