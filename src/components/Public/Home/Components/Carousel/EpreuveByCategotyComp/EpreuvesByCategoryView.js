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
      {epreuvesByCategoryViewModel.tickets.map((ticket, index) => {
  // Vérifiez que toutes les propriétés du ticket sont bien définies
  if (!ticket || !ticket.id || !ticket.imageUrl || !ticket.nameEpreuveSportive || !ticket.typeEpreuveSportive || !ticket.niveauEpreuve || !ticket.hall) {
    console.error(`Ticket ${index} is invalid:`, ticket);
    return null; // Ne pas afficher ce ticket s'il manque des données
  }

  return (
    <Card
      key={ticket.id}
      id={ticket.id}
      image={ticket.imageUrl}
      category={ticket.typeEpreuveSportive}  // Corrigé ici
      title={ticket.nameEpreuveSportive}
      niveauEpreuve={ticket.niveauEpreuve}
      hallComplexe={ticket.hall}
    />
  );
})}
  
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