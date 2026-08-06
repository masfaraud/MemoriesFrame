import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: true
})
export class TimeAgoPipe implements PipeTransform {

  transform(
    value: Date | string | number | null | undefined,
    short = true
  ): string {

    if (!value) {
      return '';
    }

    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 0) {
      return short ? 'now' : 'just now';
    }

    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (seconds < minute) {
      return short
        ? `${seconds}s ago`
        : `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }

    if (seconds < hour) {
      const m = Math.floor(seconds / minute);
      return short
        ? `${m}m ago`
        : `${m} minute${m > 1 ? 's' : ''} ago`;
    }

    if (seconds < day) {
      const h = Math.floor(seconds / hour);
      return short
        ? `${h}h ago`
        : `${h} hour${h > 1 ? 's' : ''} ago`;
    }

    if (seconds < month) {
      const d = Math.floor(seconds / day);
      return short
        ? `${d}d ago`
        : `${d} day${d > 1 ? 's' : ''} ago`;
    }

    const y = Math.floor(seconds / year);
    const remainingSeconds = seconds % year;
    const mo = Math.floor(remainingSeconds / month);

    if (short) {
      return mo > 0
        ? `${y}y ${mo}mo ago`
        : `${y}y ago`;
    }

    return mo > 0
      ? `${y} year${y > 1 ? 's' : ''} ${mo} month${mo > 1 ? 's' : ''} ago`
      : `${y} year${y > 1 ? 's' : ''} ago`;
  }
}