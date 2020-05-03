import React, { useState } from 'react'
import * as d3 from 'd3'
import AnimatedBar from '../../hooks/useAnimatedBarHooks'
import { CustomButton } from '../CustomButton'
import { Span, Div } from 'styled-base-components'

export const Graph = ({ toggle }) => {
  const generateData = (value, length = 10) =>
    d3.range(length).map((item, index) => ({
      index: index,
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }))

  const [data, setData] = useState(generateData())
  const changeData = () => {
    setData(generateData())
  }

  return (
    <Div>
      <Div>
        <Span m2 textWeightBold>Animated Bar SVG (Random Values)</Span>
        <AnimatedBar
          data={data}
          width={450}
          height={200}
          top={20}
          bottom={30}
          left={30}
          right={0}
        />
      </Div>
      <Div>
        <CustomButton info onClick={changeData} textContent='Transform' />
        <CustomButton danger textContent='Close' onClick={toggle} />
      </Div>
    </Div>
  )
}
