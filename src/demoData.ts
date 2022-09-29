import { SelectProps } from 'antd'

import { stringToOption } from './tool'

export const SUB_OPTIONS: Record<string, SelectProps['options']> = {
  A: stringToOption(['A-1', 'A-2', 'A-3']),
  B: stringToOption(['B-1', 'B-2', 'B-3']),
  C: stringToOption(['C-1', 'C-2', 'C-3']),
}

export const OPTIONS = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
]
