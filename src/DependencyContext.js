import React, { createContext, useContext } from 'react';
import DashboardViewModel from '../src/components/Private/Dashboards/DashboardViewModel';
import ProfileViewModel from '../src/components/Private/Profile/ProfileViewModel';
import CarouselViewModel from '../src/components/Public/Home/Components/Carousel/CarouselComp/CarouselViewModel';
import EpreuvesByCategoryViewModel from '../src/components/Public/Home/Components/Carousel/EpreuveByCategotyComp/EpreuvesByCategoryViewModel';
import { fetchUserAchats, fetchTicketDetails } from '../src/components/Private/Dashboards/api';
import { fetchUserProfile, updateUserProfile } from '../src/components/Private/Profile/api';
import { getCategories, getTicketsByCategory } from '../src/components/Public/Home/Components/Carousel/carouselApi';

const DependencyContext = createContext();

export const DependencyProvider = ({ children, user }) => {
    const dashboardViewModel = new DashboardViewModel(user, fetchUserAchats, fetchTicketDetails);
    const profileViewModel = new ProfileViewModel(user, fetchUserProfile, updateUserProfile);
    const carouselViewModel = new CarouselViewModel(getCategories);
    const epreuvesByCategoryViewModel = new EpreuvesByCategoryViewModel(getTicketsByCategory);

    return (
        <DependencyContext.Provider value={{ dashboardViewModel, profileViewModel, carouselViewModel, epreuvesByCategoryViewModel }}>
            {children}
        </DependencyContext.Provider>
    );
};

export const useDependencies = () => {
    return useContext(DependencyContext);
};
