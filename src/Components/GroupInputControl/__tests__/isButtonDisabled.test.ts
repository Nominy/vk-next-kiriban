import { isButtonDisabled } from '../GroupInputControl'
import { VKGroup } from '../../../../types'

describe('isButtonDisabled', () => {
  const data: VKGroup[] = [
    { key: 'group1', value: 123, membersGoal: 0 },
  ]

  it('empty fields ⇒ true', () => {
    const group: VKGroup = { key: '', value: 0, membersGoal: 0 }
    expect(isButtonDisabled(group, data)).toBe(true)
  })

  it('duplicate group ⇒ true', () => {
    const group: VKGroup = { key: 'group1', value: 123, membersGoal: 0 }
    expect(isButtonDisabled(group, data)).toBe(true)
  })

  it('valid unique group ⇒ false', () => {
    const group: VKGroup = { key: 'group2', value: 456, membersGoal: 0 }
    expect(isButtonDisabled(group, data)).toBe(false)
  })
})
