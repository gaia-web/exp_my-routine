export type RoutineRecord = {
  date: Date;
  value?: number;
  notes?: string;
};

export type Routine = {
  name: string;
  records: RoutineRecord[];
};

export type AppData = {
  routines: Routine[];
};
