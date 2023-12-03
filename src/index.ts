export class SyncTime {
  public getFormatedDate = (date:any) => {

    if(!date) {
        const date = new Date();
        const GSToffSet = 330//240; //IST is 5:30
        const offset = GSToffSet*60*1000;
        const GSTTime = new Date(date.getTime()+offset);
  
        return new Date(GSTTime.toJSON().substring(0, 10));
    } else {
        date = new Date(date);
        const GSToffSet = 330//240; //IST is 5:30
        const offset = GSToffSet*60*1000;
        const GSTTime = new Date(date.getTime()+offset);
  
        return new Date(GSTTime.toJSON().substring(0, 10));
    }
  };
  
  public changeDate = (val:any, date:any='') => {
    if(!date) {
        const date = new Date();
        const GSToffSet = 330//240;
        const offset = GSToffSet*60*1000;
        const GSTTime = new Date(date.getTime()+offset);
        GSTTime.setDate(date.getDate() + val);
  
        return new Date(GSTTime.toJSON().substring(0, 10))
    } else {
        const GSToffSet = 330//240;
        const offset = GSToffSet*60*1000;
        const GSTTime = new Date(date.getTime()+offset);
        GSTTime.setDate(date.getDate() + val);
  
        return new Date(GSTTime.toJSON().substring(0, 10))
    }
  };
  
  public getCurrentTime = () => {
    const date = new Date();
    const GSToffSet = 330//240; //IST is 5:30
    const offset = GSToffSet*60*1000;
    const GSTTime = new Date(date.getTime()+offset);
  
    return GSTTime;
  }
  
  public getLastMonthDays = () => {
  
    const currentDate = new Date();
    const lastMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0);
    const numberOfDaysInLastMonth = lastDayOfLastMonth.getDate();
  
    return numberOfDaysInLastMonth;
  }
}



// module.exports = {
//   getFormatedDate,
//   changeDate,
//   getCurrentTime,
//   getLastMonthDays
// };