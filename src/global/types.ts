

// These interfaces represent the data.json

export interface UniversityCurriculumData {
  years: Year[];
}

export interface Year {
  year: string;
  careerCurriculums: Career[];
}

export interface Career {
  name: string;
  cycles: Cycle[];
}

export interface Cycle {
  name: string;
  courseSections: CourseSections[];
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  teacher: string;
  sections: CourseSections[];
}

export interface CourseSections {
  asignment: string;
  sectionNumber: number;
  teacher: string;
  schedules: Schedule[];
}

export interface Schedule {
  day: string;
  start: string;
  end: string;
  type: string;
  scheduleNumber: number;
}
