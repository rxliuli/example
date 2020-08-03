import {
  Rule,
  RuleObject,
  RuleType,
  StoreValue,
} from 'rc-field-form/es/interface'
import { ReactElement } from 'react'

interface BaseRule {
  enum?: StoreValue[]
  len?: number
  max?: number
  message?: string | ReactElement
  min?: number
  pattern?: RegExp
  required?: boolean
  transform?: (value: StoreValue) => StoreValue
  type?: RuleType
  validator?: (
    rule: RuleObject,
    value: StoreValue,
    callback: (error?: string) => void,
  ) => Promise<void> | void
  whitespace?: boolean
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[]
}

export class RuleUtil {
  /**
   * 如果 rules 不存在则返回 undefined
   * @param rules
   */
  static wrap(rules?: Rule[]): Rule[] | undefined {
    return rules?.map((_rule) => {
      const rule = { ..._rule } as BaseRule
      if (rule.message) {
        return rule
      }
      const messages = RuleUtil.getMessages(rule)
      if (rule.required) {
        rule.message = messages.required
      }
      if (rule.max) {
        rule.message = messages.max
      }
      return rule
    })
  }

  private static getMessages(rule: BaseRule) {
    const map: {
      [P in 'string' | 'number']: Record<'required' | 'max', string>
    } = {
      string: {
        required: '此项为必填项',
        max: `最大长度为 ${rule.max} 位`,
      },
      number: {
        required: '需填写数字',
        max: `最大值为 ${rule.max} 位`,
      },
    }
    const messages = map[(rule.type as 'string' | 'number') || 'string']
    return messages
  }
}
