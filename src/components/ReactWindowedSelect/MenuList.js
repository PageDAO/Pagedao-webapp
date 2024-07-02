/**
 * Credits to react-windowed-select https://github.com/jacobworrel/react-windowed-select
 * creator Jacob Worrel @jacobworrel and all the contributors on that project
 */

import { createGetHeight, flattenGroupedChildren, getCurrentIndex } from './util'
import MenuItem from './MenuItem'
import * as React from 'react'
import { VariableSizeList as List } from 'react-window'

function MenuList(props) {
  const children = React.useMemo( () => {
    const children = React.Children.toArray(props.children)
    const head = children[0] || {}

    if (React.isValidElement(head)) {
      const {
        props: {
          data: {
            options = []
          } = {},
        } = {}
      } = head
      const groupedChildrenLength = options.length
      const isGrouped = groupedChildrenLength > 0
      const flattenedChildren = isGrouped && flattenGroupedChildren(children)

      return isGrouped ? flattenedChildren : children
    } else {
      return []
    }
  }, [props.children])
  const { getStyles} = props
  const groupHeadingStyles = getStyles('groupHeading', props)
  const noOptionsMsgStyles = getStyles('noOptionsMessage', props)
  const optionStyles = getStyles('option', props)
  const loadingMsgStyles = getStyles('loadingMessage', props)
  const getHeight = createGetHeight({
    groupHeadingStyles,
    noOptionsMsgStyles,
    optionStyles,
    loadingMsgStyles
  })
  const heights = React.useMemo(() => children.map(getHeight), [children])
  const currentIndex = React.useMemo(() => getCurrentIndex(children), [children])
  const itemCount = children.length
  const [measuredHeights, setMeasuredHeights] = React.useState({})

  // Calculate menu height
  const { maxHeight, paddingBottom = 0, paddingTop = 0, ...menuListStyle } = getStyles('menuList', props)
  const totalHeight = React.useMemo(() => {
    const result = heights.reduce((sum, height, index) => {
      if (measuredHeights[index]) {
        return sum + measuredHeights[index]
      } else {
        return sum + height
      }
    }, 0)

    return result
  }, [heights, measuredHeights])
  const totalMenuHeight = totalHeight + paddingBottom + paddingTop
  const menuHeight = Math.min(maxHeight, totalMenuHeight)
  const estimatedItemSize = Math.floor(totalHeight / itemCount)
  const { innerRef, selectedProps } = props
  const { classNamePrefix, isMulti } = selectedProps || {}
  const list = React.useRef(null)

  React.useEffect(() => {
    setMeasuredHeights({})
  }, [props.children])

  const setMeasuredHeight = ({ index, measuredHeight }) => {
    if (measuredHeights[index] !== undefined && measuredHeights[index] === measuredHeight) { return }

    setMeasuredHeights(measuredHeights => ({
      ...measuredHeights,
      [index]: measuredHeight,
    }))

    if (list.current) {
      list.current.resetAfterIndex(index)
    }
  }

  React.useEffect(() => {
    if (currentIndex >= 0 && list.current !== null) {
      list.current.scrollToItem(currentIndex)
    }
  }, [currentIndex, children, list])

  const fullClassNamePrefix = `${classNamePrefix}__menu-list${isMulti ? ` ${classNamePrefix}__menu-list--is-multi`: ''}`

  return (
    <List
      className={classNamePrefix ? fullClassNamePrefix : ''}
      style={menuListStyle}
      ref={list}
      outerRef={innerRef}
      estimatedItemSize={estimatedItemSize}
      innerElementType={React.forwardRef(({ style, ...rest }, ref) => (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${ parseFloat(style.height) + paddingBottom + paddingTop }px`
          }}
          {...rest}
        />
      ))}
      height={menuHeight}
      width="100%"
      itemCount={itemCount}
      itemData={children}
      itemSize={index => measuredHeights[index] || heights[index]}
    >
      {({ data, index, style}) => {
        return (
          <div
            style={{
              ...style,
              top: `${parseFloat(style.top.toString()) + paddingTop}px`,
            }}
          >
            <MenuItem
              data={data[index]}
              index={index}
              setMeasuredHeight={setMeasuredHeight}
            />
          </div>
        )
      }}
    </List>
  )
}

export default MenuList