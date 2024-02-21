export type RoutineRecord = {
    value?: boolean | number;
    notes?: string;
}

export type Routine = {
    name: string;
    records: RoutineRecord[];
}

export type AppData = {
    routines: Routine[];
}

