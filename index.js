import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { on, off } from 'dom-event'

const toArray = arr => Array.prototype.slice.call(arr)

const BoundingClientRects = React.createClass({
  propTypes: {
    children: PropTypes.node,
    selector: PropTypes.string,
    selectors: PropTypes.arrayOf(PropTypes.string),
    onTargets: PropTypes.func.isRequired,
    dangerouslySetInnerHTML: PropTypes.shape({__html: PropTypes.string})
  },
  render () {
    return <div
      style={{position: 'relative'}}
      dangerouslySetInnerHTML={this.props.dangerouslySetInnerHTML}/>
  },
  componentDidMount () {
    this.updateTargets()
    on(window, 'resize', this.updateTargets)
  },
  componentWillUpdate () {
    this.updateTargets()
  },
  componentWillUnmount () {
    off(window, 'resize', this.updateTargets)
  },
  shouldComponentUpdate (newProps) {
    return this.props.dangerouslySetInnerHTML.__html !== newProps.dangerouslySetInnerHTML.__html
  },
  updateTargets () {
    const {selector, selectors = [], onTargets} = this.props
    const main = ReactDOM.findDOMNode(this)
    const mainOffset = main.getBoundingClientRect()

    if (selector && !selectors.length) selectors.push(selector)

    const targets = selectors.reduce((acc, selector) => {
      const items = toArray(main.querySelectorAll(selector)).map(el => {
        const boundingClientRect = el.getBoundingClientRect()
        return {
          top: boundingClientRect.top - mainOffset.top,
          right: boundingClientRect.right - mainOffset.left,
          bottom: boundingClientRect.bottom - mainOffset.top,
          left: boundingClientRect.left - mainOffset.left,
          width: boundingClientRect.width,
          height: boundingClientRect.height,
          el, selector
        }
      })

      return acc.concat(items)
    }, [])

    onTargets(targets)
  }
})

export default BoundingClientRects
