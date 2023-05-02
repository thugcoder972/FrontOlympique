import styled from "styled-components";
import girl from "./girl6.jpeg"
export default function Card() {
  return (
    <Wrapper>
          <div className="card" >
    <img src={girl}alt="" />
  <div class="card-body">
    <div className="row">
    <div className="col">
    Jeans
   </div>
   <div className="col col-lg-3">
    $12
   </div>
    </div>
  
  </div>
  </div>
    </Wrapper>
  )
}
const Wrapper=styled.div `
width: 18rem;
`;