import { FormInstance } from 'antd/es/form'
import { FilterSelectType } from '../component/FilterSelect'
import { FilterTimeRangeType } from '../component/FilterTimeRange'
import { FilterSlotType } from '../component/FilterSlot'
import { FilterFieldTypeEnum } from '../model'

export class FilterUtil {
  /**
   * 将 form 转换为一个需要的值
   * @param form
   * @param filters
   */
  static formConvertParam(
    form: FormInstance,
    filters: (FilterSelectType | FilterTimeRangeType | FilterSlotType)[],
  ) {
    const fieldsValue = form.getFieldsValue()
    return filters.reduce(
      (res, filter) => {
        let key
        switch (filter.type) {
          case FilterFieldTypeEnum.Select:
            key = filter.field
            res[key] = fieldsValue[key]
            break
          case FilterFieldTypeEnum.TimeRange:
            key = filter.field
            res[key] = fieldsValue[key]
            break
          case FilterFieldTypeEnum.Slot:
            key = filter.field
            if (filter.computed) {
              return filter.computed(res, fieldsValue[key])
            }
            res[key] = fieldsValue[filter.field]
        }
        return res
      },
      {} as Record<string, any>,
    )
  }
}
