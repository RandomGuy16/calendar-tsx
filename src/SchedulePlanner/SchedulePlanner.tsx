import styles from './SchedulePlanner.module.scss'
import ScheduleGrid from '../Schedule/ScheduleGrid.tsx'
import CourseList from "../CoursesPanel/CourseList.tsx";


function SchedulePlanner() {
    return (
        <>
            <aside className={styles.App_aside}>
                <CourseList />
            </aside>
            <div className={styles.App_content}>
                <ScheduleGrid />
            </div>
        </>
    )
}

export default SchedulePlanner;
