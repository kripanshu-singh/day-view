import React from "react";
import styled from "styled-components";
import Event from "./Event";

// Styled components for calendar layout
const CalendarContainer = styled.div`
  width: 620px;
  height: 720px;
  padding: 0 10px;
  position: relative;
  background-color: #f5f5f5;
`;

const TimeSlot = styled.div`
  height: 60px;
  border-bottom: 1px solid #ddd;
`;

// Type definitions
interface CalendarEvent {
  title: string;
  start: number; // Start time in minutes (0-720)
  end: number; // End time in minutes (0-720)
}

interface LayoutedEvent extends CalendarEvent {
  window?: number; // Group number for overlapping events
  left?: number; // Horizontal position percentage (0-100)
  width?: number; // Width percentage (0-100)
}

interface CalendarProps {
  events: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  console.log("\n=== INITIAL EVENTS ===", events);

  // Convert time to pixel position (60px per hour)
  const timeToPosition = (minutes: number) => {
    const position = (minutes / 60) * 60;
    console.log(`Converting ${minutes}min to ${position}px`);
    return position;
  };

  // 1. Arrange events into columns to prevent overlap
  const arrangeEventsIntoColumns = (events: LayoutedEvent[]) => {
    console.log(
      "\n[ARRANGE EVENTS INTO COLUMNS] Starting with events:",
      events,
    );

    const columns: LayoutedEvent[][] = [];
    const sortedEvents = [...events].sort((a, b) => a.start - b.start);
    console.log(
      "[ARRANGE] Sorted events:",
      sortedEvents.map((e) => e.title),
    );

    sortedEvents.forEach((event) => {
      let foundColumn = false;
      console.log(`\n[ARRANGE] Processing event: ${event.title}`);

      // Try to place event in existing column
      for (const [colIndex, column] of columns.entries()) {
        const canFit = column.every(
          (existingEvent) =>
            existingEvent.end <= event.start ||
            existingEvent.start >= event.end,
        );

        console.log(
          `[ARRANGE] Checking column ${colIndex}:`,
          `Can fit? ${canFit ? "YES" : "NO"}`,
        );

        if (canFit) {
          column.push(event);
          foundColumn = true;
          console.log(`[ARRANGE] Placed in column ${colIndex}`);
          break;
        }
      }

      // Create new column if needed
      if (!foundColumn) {
        columns.push([event]);
        console.log(`[ARRANGE] Created new column ${columns.length - 1}`);
      }
    });

    console.log("[ARRANGE] Final columns structure:", columns);
    return columns;
  };

  // 2. Group overlapping events into windows
  const groupEventsIntoOverlapWindows = (events: LayoutedEvent[]) => {
    console.log("\n[GROUP OVERLAP WINDOWS] Starting with events:", events);
    if (events.length === 0) return [];

    const sortedEvents = [...events].sort((a, b) => a.start - b.start);
    console.log(
      "[GROUP] Sorted events:",
      sortedEvents.map((e) => e.title),
    );

    let currentWindowId = 1;
    let currentWindowEnd = 0;
    console.log("[GROUP] Initial window ID:", currentWindowId);

    sortedEvents.forEach((event, index) => {
      console.log(
        `\n[GROUP] Processing event ${index + 1}/${sortedEvents.length}: ${
          event.title
        }`,
      );
      console.log(
        `[GROUP] Current window: ${currentWindowId}, End time: ${currentWindowEnd}`,
      );

      if (event.start > currentWindowEnd) {
        currentWindowId++;
        currentWindowEnd = event.end;
        console.log(`[GROUP] New window ${currentWindowId} created`);
      } else {
        currentWindowEnd = Math.max(currentWindowEnd, event.end);
        console.log(`[GROUP] Extended window to ${currentWindowEnd}`);
      }

      event.window = currentWindowId;
      console.log(`[GROUP] Assigned to window ${currentWindowId}`);
    });

    console.log(
      "[GROUP] Final window assignments:",
      sortedEvents.map((e) => `${e.title} => Window ${e.window}`),
    );
    return sortedEvents;
  };

  // 3. Organize events by their window number
  const organizeEventsByWindowNumber = (events: LayoutedEvent[]) => {
    console.log("\n[ORGANIZE BY WINDOW] Starting with events:", events);
    const windowGroups: { [key: number]: LayoutedEvent[] } = {};

    events.forEach((event) => {
      console.log(
        `[ORGANIZE] Processing ${event.title} (Window ${event.window})`,
      );
      if (!windowGroups[event.window!]) {
        console.log(`[ORGANIZE] Creating new group for window ${event.window}`);
        windowGroups[event.window!] = [];
      }
      windowGroups[event.window!].push(event);
    });

    console.log("[ORGANIZE] Window groups:", windowGroups);
    return windowGroups;
  };

  // 4. Calculate positions for events in a window
  const calculateEventPositions = (windowEvents: LayoutedEvent[]) => {
    console.log(
      "\n[CALCULATE POSITIONS] Starting with window events:",
      windowEvents,
    );
    const columns = arrangeEventsIntoColumns(windowEvents);
    const columnCount = columns.length;
    console.log(`[CALCULATE] Found ${columnCount} columns`);

    columns.forEach((column, columnIndex) => {
      console.log(
        `\n[CALCULATE] Processing column ${columnIndex} with ${column.length} events`,
      );
      column.forEach((event) => {
        event.left = (columnIndex / columnCount) * 100;
        event.width = 100 / columnCount;
        console.log(
          `[CALCULATE] ${event.title}: left=${event.left}%, width=${event.width}%`,
        );
      });
    });

    const flattened = columns.flat();
    console.log("[CALCULATE] Final positioned events:", flattened);
    return flattened;
  };

  // Main processing pipeline
  console.log("\n=== STARTING PROCESSING PIPELINE ===");

  // Step 1: Group events into overlap windows
  console.log("\n[MAIN] Step 1: Grouping into overlap windows");
  const eventsWithWindows = groupEventsIntoOverlapWindows(
    events as LayoutedEvent[],
  );
  console.log("[MAIN] Events with window assignments:", eventsWithWindows);

  // Step 2: Organize events by their window number
  console.log("\n[MAIN] Step 2: Organizing by window number");
  const eventsByWindow = organizeEventsByWindowNumber(eventsWithWindows);
  console.log("[MAIN] Window groups structure:", eventsByWindow);

  // Step 3: Calculate positions for each window group
  console.log("\n[MAIN] Step 3: Calculating positions for each window");
  const allWindows: LayoutedEvent[][] = [];
  Object.values(eventsByWindow).forEach((windowEvents, index) => {
    console.log(
      `\n[MAIN] Processing window group ${index + 1} with ${
        windowEvents.length
      } events`,
    );
    const layoutedEvents = calculateEventPositions(windowEvents);
    allWindows.push(layoutedEvents);
    console.log(`[MAIN] Completed processing window group ${index + 1}`);
  });

  console.log("\n[MAIN] Final positioned events for all windows:", allWindows);
  console.log("=== PROCESSING COMPLETE ===");

  return (
    <CalendarContainer>
      {/* Time slots background */}
      {[...Array(12)].map((_, index) => (
        <TimeSlot key={index} />
      ))}

      {/* Events rendering */}
      {allWindows.flatMap((windowEvents, windowIndex) =>
        windowEvents.map((event, eventIndex) => {
          console.log(
            `Rendering event: ${event.title} at position (${
              event.left
            }%, ${timeToPosition(event.start)}px)`,
          );
          return (
            <Event
              key={`window-${windowIndex}-event-${eventIndex}`}
              title={event.title}
              top={timeToPosition(event.start)}
              height={timeToPosition(event.end - event.start)}
              left={event.left!}
              width={event.width!}
            />
          );
        }),
      )}
    </CalendarContainer>
  );
};

export default Calendar;
