import React from 'react'
import { Divider, Form, Card, Button } from 'antd'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'
import { SUB_OPTIONS, OPTIONS } from './demoData'
import { SortableSelect } from './SortableSelect'

const ControlledForm: React.FC = React.memo(() => (
  <Form onFinish={console.log}>
    <Form.Item label="Form Controled" name="controled">
      <SortableSelect key="controled" options={OPTIONS} />
    </Form.Item>
    <Button htmlType="submit">submit</Button>
  </Form>
))

const fullWidth: React.CSSProperties = {
  width: '100%',
}

export const DemoApp: React.FC = () => {
  const [mainItems, setMainItems] = React.useState<string[]>([])
  const [subItems, setSubItems] = React.useState<Record<string, string[]>>({})
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  // let currentItemValue = ''
  // const onFocus = React.useCallback(() => {
  // }, [])
  const onSubItemsChange = React.useCallback((v: UniqueIdentifier[], _: any, id: UniqueIdentifier) => {
    console.log(v)
    setSubItems(items => ({
      ...items,
      [id]: v as string[],
    }))
  }, [])

  return (
    <Card>
      Uncontroled: <SortableSelect options={OPTIONS} placeholder="uncontrolled select" id="uncontrolled" />
      <ControlledForm />
      {/* mobx controled: */}
      {/* <SortableSelect */}
      {/*   style={{ width: '20em' }} */}
      {/*   options={OPTIONS} */}
      {/*   value={itemsSetter.value} */}
      {/*   onChange={itemsSetter.set} */}
      {/* /> */}
      {/* <Select style={{ width: '100%' }} options={OPTIONS} mode="tags" /> */}
      <Form.Item label="一维">
        <SortableSelect
          // maxTagCount={2}
          // maxTagPlaceholder={Holder}
          id="one dimension"
          value={mainItems}
          style={fullWidth}
          options={OPTIONS}
          onChange={setMainItems}
        />
      </Form.Item>
      <Divider />
      <Card title="二维">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={event => {
            const { active, over } = event
            if (over && active.id !== over.id) {
              setMainItems(items => {
                const oldIndex = items.indexOf(String(active.id))
                const newIndex = items.indexOf(String(over!.id))

                const newItems = arrayMove(items, oldIndex, newIndex)
                console.log(newItems)
                return newItems
              })
            }
          }}
        >
          <SortableContext id="subItems" items={mainItems} strategy={rectSortingStrategy}>
            {mainItems.map(i => (
              <div className="ant-row ant-form-item-row" key={i}>
                <SortableItem id={i}>
                  <div className="ant-col ant-form-item-label">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label className="cursor-move" title="可拖动">
                      {i}
                    </label>
                  </div>
                </SortableItem>
                <div className="ant-col ant-form-item-control">
                  <Form.Item noStyle>
                    <SortableSelect
                      id={i}
                      options={SUB_OPTIONS[i]}
                      value={subItems[i]}
                      style={fullWidth}
                      onChange={onSubItemsChange}
                    />
                  </Form.Item>
                </div>
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </Card>
      <Button
        type="primary"
        onClick={() => {
          console.log(mainItems, subItems)
        }}
      >
        submit
      </Button>
    </Card>
  )
}
