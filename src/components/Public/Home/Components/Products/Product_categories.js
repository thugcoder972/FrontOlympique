import styled from "styled-components";
import Card from "./Component/Card";
import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTrail, animated } from "react-spring";
import { v4 as uuidv4 } from "uuid";
import { Waypoint } from "react-waypoint";
import { getTicketsByLevel } from './api';

export default function Product_categories() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };

  const [filterGallery, setFilterGallery] = useState([]);
  const [toggleTxt, setToggleTxt] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("Final");

  useEffect(() => {
    const fetchTickets = async () => {
      const data = await getTicketsByLevel(selectedLevel);
      setFilterGallery(data);
    };

    fetchTickets();
  }, [selectedLevel]);

  const handleLevelChange = (e) => {
    setSelectedLevel(e.target.value);
  };

  const trail = useTrail(filterGallery.length, {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0 },
  });

  return (
    <Wrapper>
      <h1 className="m-4 p-4 text-center">LEVEL EPREUVESs </h1>
      <div className="widthUl">
        <ul className="ulListe">
          <li className="m-3">
            <button onClick={handleLevelChange} value="Final" className="btn btn-dark m-2">
              Final
            </button>
          </li>
          <li className="m-3">
            <button onClick={handleLevelChange} value="Huitieme de final" className="btn btn-dark m-2">
              Huitieme de final
            </button>
          </li>
          <li className="m-3">
            <button onClick={handleLevelChange} value="Demi final" className="btn btn-dark m-2">
              Demi final
            </button>
          </li>
          <li className="m-3">
            <button onClick={handleLevelChange} value="Quart de final" className="btn btn-dark m-2">
              Quart de final
            </button>
          </li>
          <li className="m-3">
            <button onClick={handleLevelChange} value="Seizieme de final" className="btn btn-dark m-2">
              Seizieme de final
            </button>
          </li>
          <li className="m-3">
            <button onClick={handleLevelChange} value="Poule qualificative" className="btn btn-dark m-2">
              Poule qualificative
            </button>
          </li>
        </ul>
      </div>
      <div className="selectProduct">
        <select className="select" onChange={handleLevelChange}>
          <option value="Final">Final</option>
          <option value="Huitieme de final">Huitieme de final</option>
          <option value="Demi final">Demi final</option>
          <option value="Quart de final">Quart de final</option>
          <option value="Seizieme de final">Seizieme de final</option>
          <option value="Poule qualificative">Poule qualificative</option>
        </select>
      </div>
      <div className="featureCenter">
        <div className="container">
          <div className="ListProdcuts">
            <Waypoint bottomOffset="70%" onEnter={() => setToggleTxt(true)} />
            {trail.map((cardStyle, index) => (
              <animated.div key={uuidv4()} style={cardStyle}>
                <div className="CardProducts">
                  <animated.div>
                    <Card
                      key={filterGallery[index].id}
                      id={filterGallery[index].id}
                      image={filterGallery[index].epreuve_sportive.image_url}
                      catetypeEpreuveg={filterGallery[index].epreuve_sportive.type_epreuve_sportive}
                      title={filterGallery[index].epreuve_sportive.name_epreuve_sportive}
                      niveauEpreuve={filterGallery[index].epreuve_sportive.niveau_epreuve}
                      nameComplexe={filterGallery[index].complexe_sportif.name_complexe}
                      adressComplexe={filterGallery[index].epreuve_sportive.adresse_complexe}
                      hallComplexe={filterGallery[index].hall.name}
                      numberPlace={filterGallery[index].hall.number_place}
                      heureDebut={filterGallery[index].start_time_epreuve}
                      price={filterGallery[index].tarifs[0].tarif}  // Assuming there's at least one tariff and using the first one
                      tarifType={filterGallery[index].tarifs[0].name_tarif}  // Add this line
                    />
                  </animated.div>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
        <div className="shopping-cart" onClick={() => navigate("/cart")}>
          <ShoppingCart id="cartIcon" />
          <p>{getTotalQuantity() || 0}</p>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .ulListe {
    list-style-type: none;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .featureCenter {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ListProdcuts {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 50px;
  }
  .CardProducts {
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #70acac;
    margin: 15px;
    opacity: 1;
  }
  .photoProducts {
    padding: 20px;
    margin: 0 auto;
    border-radius: 15px;
  }
  .selectProduct {
    display: none;
  }
  @media (max-width: 950px) {
    .ulListe {
      display: none;
    }
    .selectProduct {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
