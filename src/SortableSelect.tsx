import {
  DndContext,
  // closestCenter,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  DndContextProps,
  UniqueIdentifier,
} from '@dnd-kit/core'
import React from 'react'
import { Select, SelectProps } from 'antd'
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'

import { SortableSelectTag } from './SortableSelectTag'

type OnChange = Exclude<SelectProps['onChange'], undefined>

type Props = Omit<SelectProps, 'mode' | 'onChange'> & {
  onChange?: (a: Parameters<OnChange>[0], b: Parameters<OnChange>[1], id: string) => void
}

export const SortableSelect: React.FC<Props> = React.memo(({ value, onChange: onChangeProp, id, ...props }) => {
  const [innerValue, setInnerValue] = React.useState<UniqueIdentifier[]>([])
  const sensors = useSensors(useSensor(PointerSensor))
  const uuid = React.useMemo(() => id || Math.random().toString().slice(8, -1), [id])
  const onChange = React.useMemo(() => {
    if (onChangeProp) {
      return ((v: UniqueIdentifier[], o) => {
        onChangeProp(v, o, uuid)
        setInnerValue(v)
      }) as OnChange
    }
    return setInnerValue
  }, [onChangeProp, uuid])

  const onDragEnd: DndContextProps['onDragEnd'] = event => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const items = [...innerValue]
      const oldIndex = items.indexOf(active.id)
      const newIndex = items.indexOf(over!.id)
      const newItems = arrayMove(items, oldIndex, newIndex)
      onChange!(newItems, [])
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <SortableContext id={uuid} items={value || innerValue} strategy={rectSortingStrategy}>
        <Select
          id={id}
          {...props}
          mode="multiple"
          value={value || innerValue}
          tagRender={SortableSelectTag}
          onChange={onChange}
        />
      </SortableContext>
    </DndContext>
  )
})
