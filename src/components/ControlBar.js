/** @jsxImportSource @emotion/react */
import React, { memo } from 'react'
import { css, jsx } from '@emotion/react'

const ControlBar = ({slides,state}) => {
  return (
    <div
      
      css={css`
      position: absolute;
      bottom: 40px;
      width: ${(20+20*(slides.length-1))}px;
      height: 20px;
      background: rgba(255,255,255,0.5);
      left: 0;
      right: 0;
      margin: auto;
      border-radius: 10px;
      border: 1px solid white;
      display:flex;

      .dot{
          border-radius:25%;
          background:#333;
          height:10px;
          width:10px;
          border-radius:5px;
          margin:5px;
      }

      .active
      {
          background:#fff;

      }
      `}
    >
      {
          slides.map((slide,index) => <div key={index} className={index==state.activeIndex?"dot active":"dot"}></div>)
      }
    </div>
  )
}

export default memo(ControlBar)
