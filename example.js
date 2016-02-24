import React from 'react'
import ReactDOM from 'react-dom'
import BoundingClientRects from './'

// Create element to render app inside of
var el = document.createElement('div')
document.body.appendChild(el)

var state = {
  html: `
    <div style="padding: 40px;">
      <h1>Things:</h1>
      <ul>
        <li>one</li>
        <li>two</li>
        <li>three</li>
        <li>four</li>
        <li>five</li>
      </ul>
    </div>
  `
}

function setState (change) {
  state = Object.assign({}, state, change)
  render()
}

function App (props) {
  const {html, targets = []} = props

  return (
    <div style={{position: 'relative'}}>
      <BoundingClientRects
        dangerouslySetInnerHTML={{__html: html}}
        selector='li'
        onTargets={targets => setState({targets: targets})}
      />
      {targets.map((t, i) => {
        const {top, left, width, height} = t
        console.log(t)
        const style = {
          top, left, width, height,
          position: 'absolute', background: 'cyan', opacity: 0.4
        }

        return <div key={i} style={style} onClick={() => {
          t.el.style.fontWeight = 'bold'
        }}/>
      })}
    </div>
  )
}

function render () {
  ReactDOM.render(
    <App {...state} />,
    el
  )
}

render()
