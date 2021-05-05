import React, { useEffect, useState } from 'react'
import { getCardImage } from '../images/getCardImage'
import { useWidth } from '../Utils/useWidthHook'

export function CardImage ({ card }) {
  const { Name: cardName, Text: text } = card
  const [imageSrc, setImageSrc] = useState(null)
  const [[width, height], setImageDimensions] = useState(['409px', '663px'])
  const deviceWidth = useWidth()
  useEffect(() => setImageDimensions(getImageDimensions(deviceWidth)), [
    deviceWidth
  ])
  useEffect(() => {
    if (cardName) {
      getCardImage(cardName).then(image => {
        setImageSrc(image.default)
      })
    }
  }, [cardName])

  return imageSrc ? (
    <img
      src={imageSrc}
      width={width}
      height={height}
      alt={text}
    />
  ) : (
    <div style={{ width, height }}></div>
  )
}

function getImageDimensions (width) {
  switch (width) {
    case 'xl':
    case 'lg':
      return ['247px', '400px']
    case 'md':
    case 'sm':
    case 'xs':
      return ['197px', '320px']
    default:
      return ['409px', '663px']
  }
}
