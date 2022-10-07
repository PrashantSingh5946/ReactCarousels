/** @jsxImportSource @emotion/react */
import { css, SerializedStyles } from '@emotion/react'
import { useState, useEffect, useRef } from 'react';
import SliderContent from './SliderContent';
import Arrow from './Arrow'
import Slide from './Slide';
import ControlBar from './ControlBar';

type SliderProps = {
  slides:string[];
  transitionTime: number;
  transitionInterval: number;
}
const Slider:React.FunctionComponent<SliderProps> = (props) => {

  const SliderCss:SerializedStyles = css`width:100vw; height:100vh; overflow:hidden;`;
  const { slides,transitionTime,transitionInterval } = props;
  let interval = useRef<number>(transitionInterval);

  type SliderStateProps = {
    activeIndex:number;
    transition: number;
    inTransition: boolean;
    width: number;
    translate: number;
    _slides: number[]
  }
  const [state, setState] = useState<SliderStateProps>(
    {
      "activeIndex": 0,
      "transition": transitionTime,
      "inTransition":false,
      "width": window.innerWidth,
      "translate": -window.innerWidth,
      "_slides":[3,0,1]
    })

  const stateRef:any= useRef({});
  const nextRef:any= useRef({});
  stateRef.current = state;

  useEffect(()=>{
    const cleanup:any = window.addEventListener('resize',() => {
      setState({...state,width:window.innerWidth,translate:-window.innerWidth});
      return cleanup;
    })
  },[])
  
  
  const prevSlide:any = () => {
    if (!state.inTransition) {
      setState({...state,inTransition:true,transition:transitionTime})
      var newIndex = 0;
      if (state.activeIndex) {
        newIndex = state.activeIndex - 1
      }
      else {
        newIndex = slides.length - 1;

      }
      setState({ ...state, activeIndex: newIndex, translate: 0 ,transition:transitionTime,inTransition:true})
      switchPositions(newIndex)
    }
  }
  const nextSlide:any = () => {
    if (!state.inTransition) {
      setState({ ...state, translate: state.width * -2, activeIndex: (state.activeIndex + 1) % slides.length,transition:transitionTime,inTransition:true })
      switchPositions((state.activeIndex + 1) % slides.length)
    }
  }

  const switchPositions = (index:number) => {
    //setState({...stateRef.current,inTransition:true})
    if (index == 0) {
      setTimeout(() => { setState({ ...stateRef.current, translate: -stateRef.current.width,inTransition:false,_slides:[3, 0, 1],transition:0 }); }, transitionTime*1000)
    }
    else {
      setTimeout(() => { setState({ ...stateRef.current, translate: -stateRef.current.width,inTransition:false,_slides:[index - 1, index, (index + 1) % slides.length],transition:0})}, transitionTime*1000)
    }

  }
  nextRef.current=nextSlide;
  useEffect(()=>{
    const play = () => {
      nextRef.current();
  }
    window.onresize = ()=>{setState({...stateRef.current,width:window.innerWidth,translate:-window.innerWidth})}
    let id = setInterval(play, interval.current);
    return () =>
    {
      clearInterval(id);
    }
  },[state])


  return (
    <div className="Slider" css={SliderCss}>
      <SliderContent translate={state.translate} transition={state.transition} width={state.width} >
        {
          state._slides.map((slide) => <Slide slide={slides[slide]} key={slide} ></Slide>)
        }

      </SliderContent>
      <Arrow direction="left" handleClick={prevSlide} />
      <Arrow direction="right" handleClick={nextSlide} />
      <ControlBar state={state} slides={slides}></ControlBar>
    </div>
  );
}



export default Slider;
