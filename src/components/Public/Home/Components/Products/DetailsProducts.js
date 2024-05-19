import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { addToCart } from "../../../../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { HiCash } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";
import { IoIosPaperPlane } from "react-icons/io";
import { BiAnalyse } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";

export default function DetailsProducts({ route }) {
  const { state } = useLocation();
  const dispatch = useDispatch();

  // Fonction pour formater l'heure
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  console.log(state);

  return (
    <Wrapper>
      <div className="principalDetails">
        <div className="row">
          <div className="col m-4 right">
            <img
              className="imageEncadrement"
              width={530}
              src={state.image}
              alt=""
            />
          </div>
          <div className="col center">
            <h1>{state.title}</h1>
            <h2>{state.price} $</h2>
            <button
              className="btn btn-primary p-2 my-4 activeButton"
              onClick={() => dispatch(addToCart(state))}
            >
              Add to Cart
            </button>
            <div className="Feature">
              <div className="objectFeature">
                <HiCash size={30} />
                <p>Secure checkouts</p>
              </div>
              <div className="objectFeature">
                <AiFillStar size={30} />
                <p>Fast Shipping</p>
              </div>
              <div className="objectFeature">
                <IoIosPaperPlane size={30} />
                <p>Fast Shipping</p>
              </div>
              <div className="objectFeature">
                <BiAnalyse size={30} />
                <p>Easy returns</p>
              </div>
            </div>
            <hr />
            <div>
              <p>
                <a
                  className="btn my-2 Collapse"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample1"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                >
                  NIVEAU EPREUVE
                  <BsChevronDown size={20} />
                </a>
              </p>
              <div className="row">
                <div className="col">
                  <div
                    className="collapse multi-collapse"
                    id="multiCollapseExample1"
                  >
                    <div className="card card-body cardWith">
                      <p>{state.niveauEpreuve}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p>
                <a
                  className="btn my-2 Collapse"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample2"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample2"
                >
                  COMPLEXE SPORTIF
                  <BsChevronDown size={20} />
                </a>
              </p>
              <div className="row">
                <div className="col">
                  <div
                    className="collapse multi-collapse"
                    id="multiCollapseExample2"
                  >
                    <div className="card card-body cardWith">
                      <p>{state.nameComplexe}</p>
                      <p>Adresse: {state.adressComplexe}</p>
                      <p>HALL: {state.hallComplexe}</p>
                      <p>Nombre de place: {state.numberPlace}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p>
                <a
                  className="btn my-2 Collapse"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                >
                 TYPE TARIF
                  <BsChevronDown size={20} />
                </a>
              </p>
              <div className="row">
                <div className="col">
                  <div
                    className="collapse multi-collapse"
                    id="multiCollapseExample4"
                  >
                    <div className="card card-body cardWith">
                      <p>{state.tarifType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p>
                <a
                  className="btn my-2 Collapse"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample5"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample1"
                >
                  HEURE DEBUT
                  <BsChevronDown size={20} />
                </a>
              </p>
              <div className="row">
                <div className="col">
                  <div
                    className="collapse multi-collapse"
                    id="multiCollapseExample5"
                  >
                    <div className="card card-body cardWith">
                      <p>{formatTime(state.heureDebut)}</p> {/* Utilisation de la fonction de formatage */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div>
              <p>
                <a
                  className="btn my-2 Collapse"
                  data-bs-toggle="collapse"
                  href="#multiCollapseExample3"
                  role="button"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample3"
                >
                  RETURN POLICY
                  <BsChevronDown size={20} />
                </a>
              </p>
              <div className="row">
                <div className="col">
                  <div
                    className="collapse multi-collapse"
                    id="multiCollapseExample3"
                  >
                    <div className="card card-body cardWith">
                      Returns Policy
                      <br />
                      <br />
                      <p>
                        You may return your most new, unworn items within 14
                        days from the day you receive your package. This policy
                        begins on the initial delivery attempt. Tags must be
                        attached. We will not honor your return without a tag.
                        Once we receive your package, we will inspect it and
                        issue you an online credit (minus shipping fees.) We do
                        not offer money back refunds.
                      </p>
                      <br />
                      ACCESSORIES, INTIMATES, AND SALE OR DISCOUNTED ITEMS ARE
                      FINAL SALE. NO RETURNS OR EXCHANGES.
                      <br />
                      <p>
                        Online orders will not be honored in store for exchange
                        or in-store credit. Online returns will be issued an
                        online credit.
                      </p>
                      For more detailed information on our return policy or
                      terms and conditions please visit our return policy page.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .backg {
    background-color: black;
  }
  .imageEncadrement {
    border-style: solid;
    border-width: 1px;
    border-color: black;
    padding: 10px;
    border-radius: 10px;
  }
  .center {
    text-align: start;
    margin-top: auto;
    margin-bottom: auto;
  }

  .right {
    text-align: end;
  }

  .dropddownSize {
    width: 420px;
  }
  .activeButton {
    width: 420px;
  }
  .Description {
    width: 420px;
  }
  .Feature {
    padding: 20px;
    width: 420px;
    background-color: rgba(128, 128, 128, 0.1);
  }
  .objectFeature {
    margin-right: 20px;
    display: inline-block;
    width: 70px;
    height: 80px;
    text-align: center;
  }
  .objectFeature p {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
  }
  .cardWith {
    width: 420px;
  }
  hr {
    margin-top: 0px;
    width: 420px;
  }
  .Collapse {
    display: flex;
    justify-content: space-between;
    width: 420px;
    font-size: 12px;
  }
`;
