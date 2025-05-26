import styles from './CourseItem.module.scss';
import { Course } from '../global/types.ts';


/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseItem(course: Readonly<Course>) {
  
  return (
	<div className={styles.course_item}>
	<span className={styles.course_item__title}>{course.name}</span>
	<div className={styles.course_item__class_groups}>
    {/* creates a button for every group in classGroups */}
		{course.sections.map(group => (
			<button
      className={styles.course_item__class_group}
      key={group.teacher + group.sectionNumber}
      onClick={() => {}}>
			{group.sectionNumber}
			</button>
		))}
	</div>
	</div>
	)
}

export default CourseItem;

