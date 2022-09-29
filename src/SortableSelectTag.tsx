import { useSortable } from '@dnd-kit/sortable'
import { SelectProps } from 'antd'
import { CSS } from '@dnd-kit/utilities'
import { CloseOutlined } from '@ant-design/icons'

export const SortableSelectTag: SelectProps['tagRender'] = ({ value, label, onClose }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: String(value) })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <span ref={setNodeRef} style={style} {...attributes} className="ant-select-selection-item">
      <span {...listeners} className="ant-select-selection-item-content" title="可拖动">
        {label}
      </span>
      <span className="ant-select-selection-item-remove">
        <CloseOutlined onClick={onClose} />
      </span>
    </span>
  )
}
