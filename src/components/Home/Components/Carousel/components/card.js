import styled from "styled-components";
import girl from "./girl.jpeg"
export default function Card() {
  return (
    <Wrapper>
   <div className="card" >
    <img src={girl} alt="" />
  <div class="card-body">
    <div className="row">
    <div className="col">
    Flamboy Combinaison
   </div>
   <div className="col col-lg-3">
    $35
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