import { timeZoneOffsets } from "./converts/timezones"

const parseInput = (input: number | string): number => {
    if (typeof input === 'string') {
        // Check if the input is in the format '+hours:minutes'
        if (/^[+-]?\d+:\d+$/.test(input)) {
            return timeDifferenceString(input);
        } else {
            // Assume it is a timezone string
            return timezoneString(input);
        }
    } else if (typeof input === 'number') {
        // Check if the input is a number
        return input
    } else {
        const currentDate = new Date();
        const currentOffset = -currentDate.getTimezoneOffset();

        console.log("\x1b[34m",`synctime-js warning: Invalid input provided for timezone. Hence using Local time (UTC ${currentOffset})`, "\x1b[0m");
        return currentOffset;
    }
}

const timeDifferenceString = (input:string): number => {
    const [hours, minutes] = input.split(':');

    // Convert hours and minutes to offset in minutes
    const offsetInMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    return offsetInMinutes
}

const timezoneString = (input:string): number => {
    const offsetString = timeZoneOffsets[input];

    if (offsetString !== undefined) {
        // Extract hours and minutes from the offset string
        const [hours, minutes] = offsetString.split(':');

        // Convert hours and minutes to offset in minutes
        const offsetInMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);

        return offsetInMinutes;
    } else {
        const currentDate = new Date();
        const currentOffset = -currentDate.getTimezoneOffset();

        console.log("\x1b[34m",`synctime-js warning: Invalid input provided for timezone. Hence using Local time (UTC ${currentOffset})`, "\x1b[0m");
        return currentOffset;
    }
}

export default parseInput;