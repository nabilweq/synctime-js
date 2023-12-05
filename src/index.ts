export class SyncTime {

  private timeZone: number = 1;

  constructor(timeZone: number) {
    this.timeZone = timeZone;
  }

  public getFormatedDate = (date:any) => {

    if(!date) {
        const date = new Date();
        const offset = this.timeZone * 60 * 1000;
        const time = new Date(date.getTime()+offset);
  
        return new Date(time.toJSON().substring(0, 10));
    } else {
        date = new Date(date);
        const offset = this.timeZone * 60 * 1000;
        const time = new Date(date.getTime()+offset);
  
        return new Date(time.toJSON().substring(0, 10));
    }
  };
  
  public changeDate = (val:any, date:any='') => {
    if(!date) {
        const date = new Date();
        const offset = this.timeZone * 60 * 1000;
        const time = new Date(date.getTime()+offset);
        time.setDate(date.getDate() + val);
  
        return new Date(time.toJSON().substring(0, 10))
    } else {
        const offset = this.timeZone * 60 * 1000;
        const time = new Date(date.getTime()+offset);
        time.setDate(date.getDate() + val);
  
        return new Date(time.toJSON().substring(0, 10))
    }
  };
  
  public getCurrentTime = () => {
    const date = new Date();
    const offset = this.timeZone * 60 * 1000;
    const time = new Date(date.getTime()+offset);
  
    return time;
  }
  
  public getLastMonthDays = () => {
  
    const date = new Date();
    const offset = this.timeZone * 60 * 1000;
    const time = new Date(date.getTime()+offset);
    const lastMonthDate = new Date(time.getFullYear(), time.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0);
    const numberOfDaysInLastMonth = lastDayOfLastMonth.getDate();
  
    return numberOfDaysInLastMonth;
  }
}