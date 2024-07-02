/**
 * Credits to react-windowed-select https://github.com/jacobworrel/react-windowed-select
 * creator Jacob Worrel @jacobworrel and all the contributors on that project
 */

import * as React from 'react'

export function flattenGroupedChildren(children) {
  return children.reduce((result, child) => {
    if (child.props.children != null && typeof child.props.children === "string") {
      return [...result, child]
    } else {
      const { props: { children = [] }} = child

      return [...result, React.cloneElement(child, { type: "group" }, []), ...children]
    }
  }, [])
}

export function isFocused({ props: { isFocused }}) {
  return isFocused === true
}

export function getCurrentIndex(children) {
  return Math.max(children.findIndex(isFocused), 0)
}

export function createGetHeight({
  groupHeadingStyles,
  noOptionsMsgStyles,
  optionStyles,
  loadingMsgStyles
}) {
  return function getHeight(child) {
    const {
      props: {
        type,
        children,
        inputValue,
        selectProps: {
          noOptionsMessage,
          loadingMessage
        }
      }
    } = child

    const defaultHeight = 35

    if (type === 'group') {
      const { height = defaultHeight } = groupHeadingStyles
      return height
    } else if (type === 'option') {
      const { height = defaultHeight } = optionStyles
      return height
    } else if (type === 'function' && children === noOptionsMessage({inputValue})) {
      const { height = defaultHeight } = noOptionsMsgStyles
      return height
    } else if (type === 'function' && children === loadingMessage({inputValue})) {
      const { height = defaultHeight } = loadingMsgStyles
      return height
    } else {
      return defaultHeight
    }
  }
}