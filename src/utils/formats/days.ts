export default class Days {
    // private timeZone: number = 1;
    // constructor(timeZone: number) {
    //     this.timeZone = timeZone;
    // }

    // private applyTimeZone = (date: Date): Date => {
    //     const offset = this.timeZone * 60 * 1000;
    //     return new Date(date.getTime() + offset);
    // };

    public getShortDay = (time:Date) => {
        return String(time.getUTCDate()).padStart(2, '0');
    }

    public getLongDay = (time:Date) => {
        return time.getUTCDate();
    }
    
}