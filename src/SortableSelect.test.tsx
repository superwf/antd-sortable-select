import { render, fireEvent, act } from '@testing-library/react'
import * as React from 'react'

import { SortableSelect } from './SortableSelect'
import { OPTIONS } from './demoData'

describe('SortableSelect', () => {
  beforeAll(() => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'stylesheet')
    l.setAttribute('type', 'text/css')
    l.setAttribute('href', 'https://unpkg.com/antd@4.23.3/dist/antd.min.css')
    document.head.appendChild(l)
  })

  afterEach(() => {
    const l = document.head.querySelector('link')
    expect(l?.href).toBe('https://unpkg.com/antd@4.23.3/dist/antd.min.css')
    document.head.removeChild(l!)
  })
  it('uncontrolled ', async () => {
    const placeholder = 'uncontrolled select'
    const App = () => <SortableSelect options={OPTIONS} placeholder={placeholder} />
    const app = render(<App />)
    const select = await app.findByText(placeholder)
    act(() => {
      fireEvent(select, new MouseEvent('click', {}))
    })
    // expect(tableWrapper.scrollLeft).toBe(scrollByTop)
    app.unmount()
  })
})
