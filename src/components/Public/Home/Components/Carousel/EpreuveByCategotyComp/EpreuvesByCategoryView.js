// src/components/Public/Home/Components/Carousel/EpreuvesByCategory.js

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from '../components/card';
import styled from 'styled-components';
import { observer } from "mobx-react-lite";
import { useDependencies } from '../../../../../../DependencyContext';

const EpreuvesByCategory = observer(() => {
  const { category } = useParams();
  const { epreuvesByCategoryViewModel } = useDependencies();

  useEffect(() => {
    epreuvesByCategoryViewModel.loadTickets(category);
  }, [category, epreuvesByCategoryViewModel]);

  if (epreuvesByCategoryViewModel.loading) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(epreuvesByCategoryViewModel.tickets)) {
    return <div>Error: Tickets data is not an array</div>;
  }

  return (
    <Wrapper>
      <h1>{category}</h1>
      <div className="tickets-list">
        {epreuvesByCategoryViewModel.tickets.map(ticket => (
          <Card
            key={ticket.id}
            id={ticket.id}
            image={ticket.epreuve_sportive.image_url}
            typeEpreuve={ticket.epreuve_sportive.type_epreuve_sportive}
            title={ticket.epreuve_sportive.name_epreuve_sportive}
            niveauEpreuve={ticket.epreuve_sportive.niveau_epreuve}
            nameComplexe={ticket.complexe_sportif.name_complexe}
            adressComplexe={ticket.epreuve_sportive.adresse_complexe}
            hallComplexe={ticket.hall.name}
            numberPlace={ticket.hall.number_place}
            heureDebut={ticket.start_time_epreuve}
            price={ticket.tarifs[0].tarif}  // Assuming there's at least one tariff and using the first one
            tarifType={ticket.tarifs[0].name_tarif}  // Add this line
          />
        ))}
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  .tickets-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export default EpreuvesByCategory;