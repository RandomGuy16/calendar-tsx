

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
  assignmentId: string;
  sectionNumber: number | string;
  teacher: string;
  schedules: Schedule[];
  credits: number;
}

export interface Schedule {
  assignment: string;
  assignmentId: string;
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

export interface SectionSelectionOps {
  addSections: (sections: CourseSection | CourseSection[]) => void;
  removeSections: (sections: CourseSection | CourseSection[]) => void;
}


// colors used in the CourseList element
export enum CourseColors {
  PASTEL_BLUE = '#A8D8FF',
  PASTEL_GREEN = '#B4F8C8',
  PASTEL_YELLOW = '#FBE7B2',
  PASTEL_PINK = '#FFB3B3',
  PASTEL_PURPLE = '#E0BBE4',
  PASTEL_ORANGE = '#FFD4B2',
  PASTEL_TEAL = '#A0E7E5',
  PASTEL_CORAL = '#FFAAA5',
  PASTEL_MINT = '#98FF98',
  PASTEL_LILAC = '#D4BBFF',
  PASTEL_AQUA = '#B2EBF2',
  PASTEL_ROSE = '#FFB5E8'
}

export interface CourseColor {
  background: string;
  text: string;
}

export const COLOR_PAIRS: CourseColor[] = [
  { background: CourseColors.PASTEL_BLUE, text: '#2C5282' },    // Dark blue
  { background: CourseColors.PASTEL_GREEN, text: '#276749' },   // Dark green
  { background: CourseColors.PASTEL_YELLOW, text: '#975A16' },  // Dark yellow
  { background: CourseColors.PASTEL_PINK, text: '#9B2C2C' },    // Dark red
  { background: CourseColors.PASTEL_PURPLE, text: '#553C9A' },  // Dark purple
  { background: CourseColors.PASTEL_ORANGE, text: '#9C4221' },  // Dark orange
  { background: CourseColors.PASTEL_TEAL, text: '#285E61' },    // Dark teal
  { background: CourseColors.PASTEL_CORAL, text: '#9B2C2C' },   // Dark coral
  { background: CourseColors.PASTEL_MINT, text: '#276749' },    // Dark mint
  { background: CourseColors.PASTEL_LILAC, text: '#553C9A' },   // Dark lilac
  { background: CourseColors.PASTEL_AQUA, text: '#285E61' },    // Dark aqua
  { background: CourseColors.PASTEL_ROSE, text: '#9B2C2C' }     // Dark rose
];
