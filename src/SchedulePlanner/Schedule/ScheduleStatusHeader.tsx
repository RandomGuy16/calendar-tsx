import styles from './ScheduleStatusHeader.module.scss'
import * as htmlToImage from 'html-to-image'


export default function ScheduleStatusHeader() {
  const exportImage = async () => {
    try {
      const calendarGrid = document.getElementById('calendar-grid')!
      // something tells me that this makes an image out of the whole page
      const downloadUrl = await htmlToImage.toPng(calendarGrid)
      // create download link
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'schedule.png'
      link.click()
    }
    catch (error) {
      console.error("error exporting image:", error)
    }
  }

  return (
    <div className={styles.calendar__status_header}>
      {/* image export button */}
      <button
        className={styles.calendar__status_header__export}
        export-type="image"
        onClick={() => exportImage()}>
        imagen
      </button>
      {/* excel export button */}
      <button className={styles.calendar__status_header__export} export-type="excel">
        excel
      </button>
    </div>
  )
}
