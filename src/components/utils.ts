import dayjs, { Dayjs } from "dayjs";
import { v4 as uuidv4 } from "uuid";

export interface EventProps {
  id: string;
  title: string;
  start: number;
  end: number;
  window?: number;
  left?: number;
  width?: number;
}

export const assignWindows = (events: EventProps[]) => {
  if (events.length === 0) return [];
  const sortedEvents = [...events].sort((a, b) => a.start - b.start);
  let windowNumber = 0;
  let currentWindowEnd = 0;

  for (let event of sortedEvents) {
    if (event.start < currentWindowEnd) {
      event.window = windowNumber;
    } else {
      windowNumber++;
      event.window = windowNumber;
    }
    currentWindowEnd = Math.max(currentWindowEnd, event.end);
  }
  return sortedEvents;
};

export const groupEventsByColumns = (events: EventProps[]) => {
  const columns: EventProps[][] = [];
  events.forEach((event) => {
    let placed = false;
    for (let column of columns) {
      if (!column.some((e) => e.end > event.start && e.start < event.end)) {
        column.push(event);
        placed = true;
        break;
      }
    }
    if (!placed) columns.push([event]);
  });
  return columns;
};

export const calculateLayout = (events: EventProps[]) => {
  const columns = groupEventsByColumns(events);
  const totalColumns = columns.length;

  columns.forEach((column, colIndex) => {
    column.forEach((event) => {
      event.left = (colIndex / totalColumns) * 100;
      event.width = 100 / totalColumns;
    });
  });

  return columns.flat();
};

export const processEvents = (events: EventProps[]) => {
  const eventsWithWindows = assignWindows(events);
  const groupedWindows: { [key: number]: EventProps[] } = {};
  eventsWithWindows.forEach((event) => {
    const win = event.window!;
    if (!groupedWindows[win]) groupedWindows[win] = [];
    groupedWindows[win].push(event);
  });
  return Object.values(groupedWindows).map(calculateLayout);
};

export const disabledHours = (): number[] => {
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
};

export const disabledMinutes = (e: number): number[] => {
  let result: number[] = [];
  if (e === 21) {
    result = [...Array(60).keys()];
    result.shift();
  }
  return result;
};

interface EventObject {
  start: number | null;
  end: number | null;
}

const convertToMinutesSince9AM = (time: Dayjs | null): number | null => {
  if (!time) return null;
  const baseTime = dayjs().hour(9).minute(0).second(0);
  return time.diff(baseTime, "minute");
};

export const handleTimeChange = (
  times: [Dayjs | null, Dayjs | null] | null,
) => {
  if (!times) return { start: null, end: null };
  if (times && times[0] && times[1]) {
    const event: EventObject = {
      start:
        convertToMinutesSince9AM(times[0]) !== null
          ? convertToMinutesSince9AM(times[0])! + 1
          : null,
      end:
        convertToMinutesSince9AM(times[1]) !== null
          ? convertToMinutesSince9AM(times[1])! + 1
          : null,
    };
    return event;
  }
};

export const addId = (events: Omit<EventProps, "id">[]) => {
  return events.map((event) => ({ ...event, id: uuidv4() }));
};

export const getSlots = () => {
  const hours = Array.from({ length: 13 }, (_, i) => i + 9);
  const slots = hours.flatMap((hour) => [
    {
      time: `${hour % 12 || 12}:00`,
      bold: true,
      type: `${hour >= 12 ? "PM" : "AM"}`,
    },
    { time: `${hour % 12 || 12}:30`, bold: false, type: "" },
  ]);
  slots.pop();
  return slots;
};
