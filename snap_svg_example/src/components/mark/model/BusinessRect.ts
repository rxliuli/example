import { Point } from './Point'
import { RequiredField } from '../../../common/types/RequiredField'

/**
 * 业务中的矩形
 */
export class BusinessRect {
  private static initBusinessRect = {
    color: '#000000',
    data: {},
  }
  start: Point
  end: Point
  color: string
  data: object

  constructor(param: RequiredField<Partial<BusinessRect>, 'start' | 'end'>) {
    const _param = Object.assign(BusinessRect.initBusinessRect, param)

    this.start = _param.start
    this.end = _param.end
    this.color = _param.color
    this.data = _param.data
  }
}
