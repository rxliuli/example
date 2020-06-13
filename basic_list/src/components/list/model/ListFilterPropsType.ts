import { FilterSelectType } from '../component/FilterSelect'
import { FilterTimeRangeType } from '../component/FilterTimeRange'
import { FilterSlotType } from '../component/FilterSlot'

export interface ListFilterPropsType<T = any> {
  initialValue: T
  filters: (FilterSelectType | FilterTimeRangeType | FilterSlotType)[]
  onChange: (value: T) => void
}
