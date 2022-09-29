import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableItem(props: any) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  let { children } = props
  if (!React.isValidElement(children)) {
    return children as React.ReactElement
  }

  children = React.cloneElement(props.children, {
    ...(children.props as any),
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners,
  })
  return children
}
