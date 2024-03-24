import Days from './utils/formats/days';
import Months from "./utils/formats/months";
import Time from './utils/formats/time';
import Years from "./utils/formats/years";
import parseInput from "./utils/parseInput";
import { timeZoneOffsets } from "./utils/converts/timezones";
import { TimeZoneOffsets } from "./utils/converts/timezone.interface";

export class SyncTime {
  private timeZone: number;
  private days: Days;
  private months: Months;
  private time: Time;
  private year: Years;

  constructor(timeZone: number | string) {
    this.timeZone = parseInput(timeZone);
    this.days = new Days();
    this.months = new Months();
    this.time = new Time();
    this.year = new Years();
  }

  public getTimeZones = (): TimeZoneOffsets => {
    return timeZoneOffsets;
  };

  private applyTimeZone = (date: Date): Date => {
    const offset = this.timeZone * 60 * 1000;
    return new Date(date.getTime() + offset);
  };

  public getFormatedDate = (date:Date|string = new Date()):any => {
    const dateString = date.toString()
    const timeZoneIndex = dateString.indexOf(".000Z");
    if (timeZoneIndex !== -1) date = new Date(dateString.slice(0, timeZoneIndex)) 
    else date = new Date(date);

    const time = new Date(new Date(this.applyTimeZone(date)).toJSON().split('T')[0]);

    const proxyObject = new Proxy(time, {
      get: (target, prop) => {
          if (prop === 'format') {
              return (formatString: string) => this.format(time, formatString);
          } else {
            return target;
          }
      }
    });

    return proxyObject;
  };

  public changeDate = (val: number, date: string|Date = ''):any => {

    if (!date) {
      date = new Date();
    } else {
      date = new Date(date);
    }

    const time = this.applyTimeZone(date);
    time.setDate(time.getDate() + val);
    const changedDate = time

    const proxyObject = new Proxy(changedDate, {
      get: (target, prop) => {
          if (prop === 'format') {
              return (formatString: string) => this.format(changedDate, formatString);
          } else {
              return target;
          }
      }
    });

    return proxyObject;
  };

  public getCurrentTime = (): any => {
    const date = new Date();
    const time = this.applyTimeZone(date);
    const proxyObject = new Proxy(time, {
        get: (target, prop) => {
            if (prop === 'format') {
                return (formatString: string) => this.format(time, formatString);
            } else {
                return target;
            }
        }
    });
    return proxyObject;
};

  public getLastMonthDays = () => {
    const date = new Date();
    const time = this.applyTimeZone(date);
    const lastMonthDate = new Date(time.getFullYear(), time.getMonth() - 1, 1);
    const lastDayOfLastMonth = new Date(lastMonthDate.getFullYear(), lastMonthDate.getMonth() + 1, 0);
    const numberOfDaysInLastMonth = lastDayOfLastMonth.getDate();

    return numberOfDaysInLastMonth;
  };

  public format(timeString: string|Date, formatString:string) {
    let time = new Date(timeString);
    const formatMap:any = {
        'DD': () => this.days.getLongDay(time),
        'D': () => this.days.getShortDay(time),
        'MM': () => this.months.monthLongDigit(time),
        'MMM': () => this.months.shortMonth(time),
        'MMMM': () => this.months.longMonth(time),
        'M': () => this.months.monthShortDigit(time),
        'YYYY': () => this.year.fullYear(time),
        'YY': () => this.year.fullYear(time),
        'HH': () => this.time.hours24(time),
        'hh': () => this.time.hours(time),
        'mm': () => this.time.minutes(time),
        'ss': () => this.time.seconds(time),
        'a': () => this.time.ampm(time),
        'A': () => this.time.ampmCaps(time)
    };
    
    const regex = /a|A|DD|D|MMMM|MMM|YYYY|YY|HH|hh|mm|ss|MM|M/g;
    const matches = formatString.match(regex);

    if (!matches) {
      return null;
    }

    const parts = formatString.split(/(a|A|DD|D|MMMM|MMM|YYYY|YY|HH|hh|mm|ss|MM|M)/g);

    const formattedString = parts.map((part, index) => {
      return index % 2 === 0 ? part : formatMap[matches[Math.floor(index / 2)]]()
    })
    .join('');

    return formattedString;
  }

  public getDays = (date1:any, date2:any) => {
    const diffTime =  Math.abs(new Date(date1).getTime() - new Date(date2).getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  public secondsToHms = (seconds:number) => {
    const d = Math.floor(seconds / (3600*24));
    const h = Math.floor(seconds % (3600*24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    const hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hr ") : "";
    const mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
    const sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay; 
  }

  public dateWithoutTime = (date:Date|string) => {
    const dateString = date.toString()
    const timeZoneIndex = dateString.indexOf(".000Z");
    if (timeZoneIndex !== -1) date = new Date(dateString.slice(0, timeZoneIndex)) 
    else date = new Date(date);

    return new Date(this.applyTimeZone(date)).toJSON().split('T')[0]
  };
}

const rr = new SyncTime('');

console.log(rr.getCurrentTime().format('DD MMMM YYYY hh:mm:ss'));