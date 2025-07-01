import styles from './CourseCard.module.scss';
import { CourseSection } from '../../global/types.ts';
import { useState } from 'react'


function createSectionButtons(
  sections: CourseSection[],
  selectedSection: CourseSection | undefined,
  setSelected: (section: CourseSection) => void) {
  // define array to return
  const courseSectionsList = []
  // iterate over all sections using a for loop
  for (let i = 0; i < sections.length; i++) {
    const section: CourseSection = sections[i]
    const itemKey: string = `${i}CourseItemButton:` + section.credits +
    section.teacher + section.assignment + section.sectionNumber
    
    // append a button for each section
    courseSectionsList.push(
      <label key={itemKey}>
        <input
          type="radio"
          value={`1`}
          checked={selectedSection === section}
          onChange={() => {
            setSelected(section)
            console.log(selectedSection)
          }}
          onClick={() => {
            console.log(selectedSection)
          }}
          name={`section:${section.assignment}${section.teacher}`}
        />
      </label>
    )
  }
  return courseSectionsList
}

interface CourseCardProps {
  name: string;
  sections: CourseSection[];
  id: string;
  //addChosenSection: (section: CourseSection) => void;
}

/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({name, sections, id, }: CourseCardProps) {
  const [selectedSection, setSelectedSection] = useState<CourseSection>()
  return (
    <div className={styles.course_item} id={id}>
      <span className={styles.course_item__title}>{name}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(sections.length > 0) && createSectionButtons(sections, selectedSection, setSelectedSection)}
      </div>
	  </div>
	)
}

export default CourseCard;

