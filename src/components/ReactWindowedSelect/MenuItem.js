/**
 * Credits to react-windowed-select https://github.com/jacobworrel/react-windowed-select
 * creator Jacob Worrel @jacobworrel and all the contributors on that project
 */

import * as React from 'react'

function MenuItem(props) {
  const { data, index, setMeasuredHeight } = props
  const ref = React.useRef(null)

  React.useLayoutEffect(() => {
    if (ref.current) {
      const measuredHeight = ref.current.getBoundingClientRect().height
      setMeasuredHeight({ index, measuredHeight })
    }
  }, [ref.current])

  return (
    <div key={`option-${index}`} ref={ref}>
      {data}
    </div>
  )
}

export default MenuItem