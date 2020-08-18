import 'react-app-polyfill/ie11'
import React from 'react'
import ReactDOM from 'react-dom'
import Shuffling from './'

const App = () => (
  <>
    <Shuffling steps={['React', 'Angular', 'Vue', 'Ember', 'Angular.js']} />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))
