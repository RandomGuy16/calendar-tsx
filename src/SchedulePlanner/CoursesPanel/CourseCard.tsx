import { Course, CourseSection, SectionSelectionOps, CourseColor } from '../../global/types.ts';
import { useState, useEffect } from 'react';


/*
 * Properties for the 2 kinds of course checkboxes
 * */
interface CourseCardCheckboxProps {
  course: Course;
  section?: CourseSection;
  checked: boolean;
  allChecked?: boolean;
  setAllChecked?: (val: boolean) => void;
  sectionOps: SectionSelectionOps;
}

function CourseCardCheckbox({ course, section, checked, allChecked, setAllChecked, sectionOps }: CourseCardCheckboxProps) {
  // valuable comment: checked is the local state of the checkbox, initialized in the course object

  useEffect(() => {
    console.log(checked, checked, allChecked, course)
  }, [checked])

  return (
    <label className={`p-2 mx-1/2 font-normal text-sm duration-100 ease-linear select-none ${checked ? "bg-neutral-800" : ""}`} data-checked={checked}>
      <input
        className="hidden"
        type="checkbox"
        checked={checked || allChecked}
        onChange={() => {
          if (!checked) {
            // update global trackers
            sectionOps.addSections(section!)
            if (course.getSelectedSections().length === 0) sectionOps.trackCourse(course)
            // update course
            course.selectSection(section!)
          }
          else {
            sectionOps.removeSections(section!)
            if (course.getSelectedSections().length === 1) sectionOps.untrackCourse(course)
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
    <label className={`p-2 mx-1/2 font-normal text-sm duration-100 ease-linear select-none ${checked ? "bg-neutral-800" : ""}`} data-checked={checked}>
      <input
        className="hidden"
        type="checkbox"
        checked={checked}
        onChange={() => {
          if (!checked) {
            sectionOps.addSections(course.getSections().filter(section => !course.isSectionSelected(section)))
            if (course.getSelectedSections().length === 0) sectionOps.trackCourse(course)
            course.selectAllSections()
          }
          else {
            // update the global trackers
            sectionOps.removeSections(course.getSections())
            sectionOps.untrackCourse(course)
            // update the course
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
  course: Course;
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
    <div className="w-full font-normal text-left my-2 rounded-md p-2" id={course.getId()}
      style={{ backgroundColor: colorPair.background, color: colorPair.text }}>
      <span className="text-right text-base mb-2">{course.getName()}</span>
      <div className="flex flex-row justify-start items-center mt-2">
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

