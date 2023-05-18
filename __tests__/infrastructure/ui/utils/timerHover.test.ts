import timerHover from '../../../../src/infrastructure/ui/utils/timeHover'
import { expect, describe, it } from '../../../../setupTest'
import { vi } from 'vitest'

describe('timerHover', () => {
  it('should set elem.style.scale to "1" after the timeout completes', () => {
    vi.useFakeTimers()
    const mockElem = { style: { scale: '0' } } as HTMLDivElement
    timerHover(mockElem)
    vi.runAllTimers()
    expect(mockElem.style.scale).toBe('1')
  })
})
