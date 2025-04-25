import { ReactNode, useState } from 'react'
import styles from './Tabs.module.scss'


interface Tab {
	id: string,
	label: string,
	content: ReactNode
}
interface TabsProps {
	tabs: Tab[],
	defaultActiveTab?: string,
}

function Tabs({ tabs, defaultActiveTab }: Readonly<TabsProps>) {
	const [activeTab, setActiveTab] = useState<string>(defaultActiveTab ?? tabs[0].id)
	
	return (
	<div className={styles.tabs}>
		<nav className={styles.tabs__nav}>
			{tabs.map(tab => (
				<button
					id='sidebar__minicalendar-menu-button'
					key={tab.id}
					className={`${styles.tabs__button} ${activeTab === tab.id ? styles.active : ""}`}
					onClick={() => {setActiveTab(tab.id)}}>
					{tab.label}
				</button>
			))}
		</nav>
		<div className={styles.tabs__content}>
			{tabs.find(tab => tab.id === activeTab)?.content}
		</div>
	</div>
	)
}

export default Tabs