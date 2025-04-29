

export interface Course {
  title: string;
  courseGroups: CourseGroup[];
  id: string;
}

export interface CourseGroup {
  courseTitle: string;
  shift: string;
}
