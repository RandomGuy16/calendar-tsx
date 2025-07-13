import styles from './CourseCard.module.scss';
import { CourseSection, SectionSelectionOps } from '../../global/types.ts';
import { useState } from 'react'


/*
 * Properties for the 2 kinds of course checkboxes
 * */
interface CourseCardCheckboxProps {
  section?: CourseSection;
  sections?: CourseSection[];
  checked: boolean;
  setChecked: () => void;
  sectionOps: SectionSelectionOps;
}

function CourseCardCheckbox({ section, checked, setChecked, sectionOps }: CourseCardCheckboxProps) {
  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checked}>
      <input
        type="checkbox"
        value={` `}
        checked={checked}
        onChange={() => {
          if (!checked) sectionOps.addSections(section!)
          else sectionOps.removeSections(section!)
          // setChecked runs at last because it takes a moment to update its value
          setChecked()
        }}
        name={`section:${section!.assignment}${section!.teacher}`} />
      {section!.sectionNumber}
    </label>
  )
}
function CourseCardCheckboxAll({ sections, checked, setChecked, sectionOps }: CourseCardCheckboxProps) {
  return (
    <label className={`${styles.course_item__class_groups__checkbox}`} data-checked={checked}>
      <input
        type="checkbox"
        value={` `}
        checked={checked}
        onChange={() => {
          if (!checked) sectionOps.addSections(sections!)
          else sectionOps.removeSections(sections!)
          // setChecked runs at last because it takes a moment to update its value
          setChecked()
        }}
        name={`section:${sections![0].assignment}${sections![0].teacher}`} />
      todas
    </label>
  )
}


interface CourseCardProps {
  name: string;
  sections: CourseSection[];
  id: string;
  sectionOps: SectionSelectionOps;
}
/**
 * displays a course in the course list
 * @param course to be displayed
 * @returns a styled div with the course
 */
function CourseCard({ name, sections, id, sectionOps }: CourseCardProps) {
  // set to track locally selected sections (per course)
  const [selected, setSelected] = useState<Set<CourseSection>>(new Set())

  return (
    <div className={styles.course_item} id={id}>
      <span className={styles.course_item__title}>{name}</span>
      <div className={styles.course_item__class_groups}>
        {/* creates a button for every group in classGroups */}
        {(sections.length > 0) && (
          <>
            <CourseCardCheckboxAll
              sections={sections}
              checked={selected.size === sections.length}
              setChecked={() => {
                if (selected.size === sections.length) {  // unselect all
                  setSelected(new Set())
                }
                else {  // select all
                  setSelected(new Set(sections))
                }
              }}
              sectionOps={sectionOps}>
            </CourseCardCheckboxAll>
            {sections.map((section: CourseSection, index: number) =>
              <CourseCardCheckbox
                key={`CourseItemButton:${index}` + section.sectionNumber}
                checked={selected.has(section)}
                setChecked={() => {
                  const temp = new Set(selected)
                  if (temp.has(section)) temp.delete(section)  // remove if it's already selected
                  else temp.add(section)  // add if it's not tracked
                  setSelected(temp)
                }}
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

