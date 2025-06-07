import styles from './SearchFIlter.module.scss'
import Select from 'react-select'
import { Dispatch } from 'react'
import { FilterChooser, Filters } from '../../global/types'


// requires: the filterchooser, i dont know how to name it
// the user filters, and the setter for these user filters
interface FilterboxArgs {
  filterChooser: FilterChooser;
  selectedFilters: Filters;
  selectedFiltersSetter: Dispatch<React.SetStateAction<Filters>>;
}

interface selectArgument {
  label: string;
  value: string;
}

function SearchFilter({filterChooser, selectedFilters, selectedFiltersSetter}: FilterboxArgs) {
  return (
    <div className={styles.filterbox}>
      {/* separate Select element for each category in filterChooser */}
      {/*
        when a select element from here changes the filters, the useEffect of CoursesPanel
        reconfigures the courses available
      */}
      <Select
      className={styles.filterbox__list}
      options={
        filterChooser.careers.map(filterOption => ({
          value: filterOption,
          label: filterOption,
        }))
      }
      defaultValue={{
        label: selectedFilters.career,
        value: selectedFilters.career
      }}
      value={{
        label: selectedFilters.career,
        value: selectedFilters.career
      }}
      onChange={(newValue: unknown) => {
        selectedFiltersSetter({
          career: (newValue as selectArgument).value,
          cycle: selectedFilters.cycle,
          year: selectedFilters.year
        })
      }}>
      </Select>

      <Select
      className={styles.filterbox__list}
      options={
        filterChooser.cycles.map(filterOption => ({
          label: filterOption,
          value: filterOption,
        }))
      }
      defaultValue={{
        label: selectedFilters.cycle,
        value: selectedFilters.cycle
      }}
      value={{
        label: selectedFilters.cycle,
        value: selectedFilters.cycle
      }}
      onChange={(newValue: unknown) => {
        selectedFiltersSetter({
          career: selectedFilters.career,
          cycle: (newValue as selectArgument).value,
          year: selectedFilters.year
        })
      }}>
      </Select>

      <Select
      className={styles.filterbox__list}
      options={
        filterChooser.years.map(filterOption => ({
          label: filterOption,
          value: filterOption
        }))
      }
      defaultValue={{
        label: selectedFilters.year,
        value: selectedFilters.year
      }}
      value={{
        label: selectedFilters.year,
        value: selectedFilters.year
      }}
      onChange={(newValue: unknown) => {
        selectedFiltersSetter({
          career: selectedFilters.career,
          cycle: selectedFilters.cycle,
          year: (newValue as selectArgument).value,
        })
      }}>
      </Select>

    </div>
  )
}

export default SearchFilter;

