import { DateTime } from "luxon";

export class LuxonHelper {
  public static plus(date: Date, days: number): Date {
    return DateTime.fromJSDate(date).plus({ days }).toJSDate();
  };

  public static between(start: Date, end: Date): Date {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  };
};
