/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import Slide from './Slide'
import React from "react";

type SliderContentProps = {
  width: number;
  translate: number;
  transition:number;
  children: React.ReactElement[];
}

const SliderContent:React.FunctionComponent<SliderContentProps> = (props) =>{
    const {width,translate} = props;
    const SliderContentCss = css`width:${props.width*3}px; height:100vh; overflow:hidden; display:flex;transition:${props.transition}s;transform:translateX(${translate}px)`;
  return (
    <div className="SliderContent" css={SliderContentCss} >
      {
          props.children
      }
    </div>
  );
}



export default SliderContent;
