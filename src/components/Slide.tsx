/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

type SlideProps = {
    slide: string;
}

const Slide:React.FunctionComponent<SlideProps> = (props) => {
 
    let { slide } = props;
    const slideCss = css`width:100%; height:100vh; background-image:url(${slide}); background-size:cover; width:3072px; background-repeat: no-repeat;
    background-position: center`;
    return (
        <div className="slide" css={slideCss} >

        </div>
    );
}



export default Slide;
