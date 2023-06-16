import styled from "styled-components";
import { useLocation } from "react-router-dom";
export default function DetailsProducts({route}) {
    const { state } = useLocation();
    console.log(state);
  return (

    <Wrapper>
  
        <div className="container ">
          
       <h1>detailsproducts</h1>       
       
        </div>

    </Wrapper>
  )
}
const Wrapper=styled.div `


`;