import React from 'react'
import ReactDOM from 'react-dom'
import Shuffling from './index'

describe('Shuffling', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Shuffling steps={['React', 'Angular', 'Vue', 'Ember', 'Angular.js']} />,
      div,
    )
    ReactDOM.unmountComponentAtNode(div)
  })
})
