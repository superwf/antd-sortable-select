import React from 'react'
import { Divider, Form, Card, Button, Row } from 'antd'
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

const ControlledForm: React.FC = React.memo(() => {
  const [form] = Form.useForm()
  const [result, setResult] = React.useState<string[]>([])
  return (
    <Form onFinish={v => setResult(v.controlled)} form={form}>
      <Form.Item label="Form Controled" name="controlled">
        <SortableSelect className="controlled" key="controlled" options={OPTIONS} />
      </Form.Item>
      <Row justify="center">
        <Button htmlType="submit" type="primary">
          submit
        </Button>
      </Row>
      <div>{result && result.length && result.join(',')}</div>
    </Form>
  )
})

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
  const onSubItemsChange = React.useCallback((v: UniqueIdentifier[], _: any, id: UniqueIdentifier) => {
    setSubItems(items => ({
      ...items,
      [id]: v as string[],
    }))
  }, [])

  return (
    <Card>
      <Form.Item label="Uncontroled">
        <SortableSelect
          style={fullWidth}
          options={OPTIONS}
          placeholder="uncontrolled select"
          id="uncontrolled"
          className="uncontrolled"
        />
      </Form.Item>
      <ControlledForm />
      <Divider />
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
      <Row justify="center">
        <Button
          type="primary"
          onClick={() => {
            console.log(mainItems, subItems)
          }}
        >
          submit
        </Button>
      </Row>
    </Card>
  )
}
