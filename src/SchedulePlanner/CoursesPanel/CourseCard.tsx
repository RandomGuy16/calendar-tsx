import styles from './CourseCard.module.scss';
import { CourseSection } from '../../global/types.ts';


function createSectionButtons(sections: CourseSection[]) {
  // define array to return
  const courseSectionsList = []
  // iterate over all sections using a for loop
  for (let i = 0; i < sections.length; i++) {
    const section: CourseSection = sections[i]
    const itemKey: string = `${i} courseitembutton:` + section.credits +
    section.teacher + section.assignment + section.sectionNumber
    
    // append a button for each section
    courseSectionsList.push(
      <button
        className={styles.course_item__class_group}
        key={itemKey}
        onClick={()=> {}}>
        {section.sectionNumber}
      </button>
    )
  }
  return courseSectionsList
}

interface CourseCardProps {
  name: string;
  sections: CourseSection[];
  addChosenSection: (section: CourseSection) => void;
}

/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({name, sections, addChosenSection}: CourseCardProps) {
  return (
    <div className={styles.course_item}>
      <span className={styles.course_item__title}>{name}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(sections.length > 0) && createSectionButtons(sections)}
      </div>
	  </div>
	)
}

export default CourseCard;

