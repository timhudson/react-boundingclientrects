# react-boundingclientrects

Fetch boundingClientRects by selector for dangerouslySetInnerHTML

This is helpful for building isolated UIs on top of content within `dangerouslySetInnerHTML`.

## Example

``` js
import BoundingClientRects from 'react-boundingclientrects'
...
<BoundingClientRects
  dangerouslySetInnerHTML={sanitizedHTML}
  selector='li'
  onTargets={targets => setState({targets: targets})} />
```

## Props

### `dangerouslySetInnerHTML`

This is required. See React's [documentaion](https://facebook.github.io/react/tips/dangerously-set-inner-html.html).

### `selector`

This selector will be used to query DOM elements. It is these elements that will be surfaced as targets.

### `selectors=[]`

Alternatively, multiple selectors can be provided in a `selectors` array.

``` js
selectors=['.one', '.two', '.red', '.blue']
```

### `onTargets(targets=[])`

`onTargets` will be called with an array of targets. Targets contain the calculated position based on this components main DOM node.

``` js
// Calculation example
target.boundingClientRects().top - mainNode.boundingClientRects().top
```

``` js
// Example target
{
  selector: 'li',
  el: <node>,
  width: 1022,
  height: 18,
  top: 119.875,
  right: 1102,
  bottom: 137,
  left: 80
}
```
