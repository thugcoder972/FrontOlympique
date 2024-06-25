import React, { createContext, useContext } from 'react';
import DashboardViewModel from '../src/components/Private/Dashboards/DashboardViewModel';
import { fetchUserAchats, fetchTicketDetails } from '../src/components/Private/Dashboards/api';

const DependencyContext = createContext();

export const DependencyProvider = ({ children, user }) => {
  const dashboardViewModel = new DashboardViewModel(user, fetchUserAchats, fetchTicketDetails);

  return (
    <DependencyContext.Provider value={{ dashboardViewModel }}>
      {children}
    </DependencyContext.Provider>
  );
};

export const useDependencies = () => {
  return useContext(DependencyContext);
};
