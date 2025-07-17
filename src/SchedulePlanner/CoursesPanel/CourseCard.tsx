import styles from './CourseCard.module.scss';
import { CourseObj, CourseSection, SectionSelectionOps, CourseColor } from '../../global/types.ts';
import { useState, useEffect } from 'react';


/*
 * Properties for the 2 kinds of course checkboxes
 * */
interface CourseCardCheckboxProps {
  course: CourseObj;
  section?: CourseSection;
  checked: boolean;
  allChecked?: boolean;
  setAllChecked?: (val: boolean) => void;
  sectionOps: SectionSelectionOps;
}

function CourseCardCheckbox({ course, section, checked, allChecked, setAllChecked, sectionOps }: CourseCardCheckboxProps) {
  // I named it "stateChecked" because "checked" is already used in the props"
  // const [stateChecked, setStateChecked] = useState(checked)
  //let checked = checked
  useEffect(() => {
    console.log(checked, checked, allChecked, course)
  }, [checked])

  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checked}>
      <input
        type="checkbox"
        checked={checked || allChecked}
        onChange={() => {
          if (!checked) {
            sectionOps.addSections(section!)
            course.selectSection(section!)
          }
          else {
            sectionOps.removeSections(section!)
            course.unselectSection(section!)
          }
          // setChecked runs at last because it takes a moment to update its value
          //setStateChecked(!checked)
          setAllChecked!(course.areAllSectionsSelected())
        }}
      />
      {section!.sectionNumber}
    </label>
  )
}
function CourseCardCheckboxAll({ course, checked, setAllChecked, sectionOps }: CourseCardCheckboxProps) {
  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checked}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          if (!checked) {
            sectionOps.addSections(course.getSections().filter(section => !course.isSectionSelected(section)))
            course.selectAllSections()
          }
          else {
            sectionOps.removeSections(course.getSections())
            course.unselectAllSections()
          }
          // setChecked runs at last because it takes a moment to update its value
          setAllChecked!(course.areAllSectionsSelected())
        }}
      />
      todas
    </label>
  )
}


interface CourseCardProps {
  course: CourseObj;
  sectionOps: SectionSelectionOps;
  colorPair: CourseColor;
}
/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({ course, sectionOps, colorPair }: CourseCardProps) {
  // set to track locally selected sections (per course)
  const [areAllChecked, setAreAllChecked] = useState(course.areAllSectionsSelected())

  return (
    <div className={styles.course_item} id={course.getId()}
      style={{ backgroundColor: colorPair.background, color: colorPair.text }}>
      <span className={styles.course_item__title}>{course.getName()}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(course.getSections().length > 0) && (
          <>
            <CourseCardCheckboxAll
              course={course}
              checked={areAllChecked}
              setAllChecked={setAreAllChecked}
              sectionOps={sectionOps}>
            </CourseCardCheckboxAll>
            {course.getSections().map((section: CourseSection, index: number) =>
              <CourseCardCheckbox
                key={`CourseItemButton:${index}` + section.sectionNumber}
                course={course}
                checked={course.isSectionSelected(section) || areAllChecked}
                allChecked={areAllChecked}
                setAllChecked={setAreAllChecked}
                section={section}
                sectionOps={sectionOps}>
              </CourseCardCheckbox>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CourseCard;

