

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
  assignment: string;
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

// These interfaces help filter course
// FilterChooser gets data from the webpage and outputs it to Filters
export interface FilterChooser {
  years: string[];
  cycles: string[];
  careers: string[];
}

export interface Filters {
  year: string;
  cycle: string;
  career: string;
}

// interface used by SearchFilter in CourseList.tsx and SearchFilter.tsx
export interface SelectFilterOption {
  label: string;
  value: Career[];
}


