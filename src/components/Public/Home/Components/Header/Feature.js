import styled from "styled-components";
import { HiCash } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
export default function Feature() {
  return (
    <Wrapper>

        <div >
            <div className="row text-center">
                <div className="col p-4">
                <HiCash size={30} /> <span className="mx-3">FAST SECURE PAYMENTS</span> 
                </div>
                <div className="col bg-danger p-4">
                <AiFillStar size={30} />
                <span className="mx-3"> PREMIUM PRODUCTS</span>
                </div>
                <div className="col p-4">
                <IoIosPaperPlane size={30} />
                <span className="mx-3"> FREE & FAST DELIVERY</span>
                </div>
            </div>
        </div>
    </Wrapper>
  )
}
const Wrapper=styled.div `




`;