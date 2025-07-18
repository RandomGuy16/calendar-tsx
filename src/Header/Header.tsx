import styles from './Header.module.scss'


function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <button className={styles.header__left_button}>
          <span className={styles.header__left_icon}>☰</span>
        </button>
        <h1 className={styles.header__title}>Calendar</h1>
      </div>
      <div className={styles.header__right}>
      </div>
    </div>
  )
}

export default Header
