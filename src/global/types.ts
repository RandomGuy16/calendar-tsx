

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
  sectionNumber: number;
}


export class Course {
  private readonly id: string;
  private readonly name: string;
  private readonly career: string;
  private readonly credits: number;
  private readonly teacher: string;
  private readonly sections: Set<CourseSection>;
  private readonly selectedSections: Set<CourseSection>;

  constructor(id: string, name: string, credits: number, teacher: string, career: string, section?: CourseSection) {
    this.id = id
    this.name = name
    this.credits = credits
    this.teacher = teacher
    this.career = career
    this.sections = new Set()
    this.selectedSections = new Set()
    if (section) this.sections.add(section)
  }

  addSection(section: CourseSection) {
    this.sections.add(section)
  }
  hasSection(section: CourseSection): boolean {
    return this.sections.has(section)
  }

  selectSection(section: CourseSection) {
    this.selectedSections.add(section)
  }
  selectAllSections() {
    this.sections.forEach(section => this.selectedSections.add(section))
  }
  unselectSection(section: CourseSection) {
    this.selectedSections.delete(section)
  }
  unselectAllSections() {
    this.selectedSections.clear()
  }
  isSectionSelected(section: CourseSection): boolean {
    return this.selectedSections.has(section)
  }
  areAllSectionsSelected(): boolean {
    return this.selectedSections.size === this.sections.size
  }

  getSections(): CourseSection[] {
    return Array.from(this.sections)
  }
  getSelectedSections(): CourseSection[] {
    return Array.from(this.selectedSections)
  }
  getId(): string { return this.id }
  getName(): string { return this.name }
  getCredits(): number { return this.credits }
  getTeacher(): string { return this.teacher }
  getCareer(): string { return this.career }

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

// Global interface for trackers selection operations
export interface SectionSelectionOps {
  addSections: (sections: CourseSection | CourseSection[]) => void;
  removeSections: (sections: CourseSection | CourseSection[]) => void;
  trackCourse: (course: Course) => void;
  untrackCourse: (course: Course) => void;
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

// Map to store course ID to color mapping
const courseColorMap = new Map<string, CourseColor>();

/**
 * Gets or generates a consistent color pair for a course
 * @param courseId Unique identifier for the course
 * @returns Object containing background and text colors
 */
export function getCourseColor(courseId: string) {
  // returns already generated color
  if (courseColorMap.has(courseId)) {
    return courseColorMap.get(courseId)!;
  }

  // it hasn't generated a color for the course, generates a new pair
  const colorIndex = courseColorMap.size % COLOR_PAIRS.length;
  const newColor = COLOR_PAIRS[colorIndex];
  courseColorMap.set(courseId, newColor);

  return newColor;
}


interface SectionAndCareer {
  section: CourseSection;
  career: string;
}

export function createCourseKey(input: SectionAndCareer | Course): string {
  if (input instanceof Course) return `${input.getId()} ${input.getName()} ${input.getCareer()}`
  else return `${input.section.assignmentId} ${input.section.assignment} ${input.career}`
}


export function getCourseKey(course: Course): string {
  return `${course.getId()} ${course.getName()} ${course.getCareer()}`
}

