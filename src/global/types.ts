

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
  courseSections: CourseSection[];
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  teacher: string;
  sections: CourseSection[];
}

export interface CourseSection {
  asignment: string;
  sectionNumber: number;
  teacher: string;
  schedules: Schedule[];
  credits: number;
}

export interface Schedule {
  day: string;
  start: string;
  end: string;
  type: string;
  scheduleNumber: number;
}
