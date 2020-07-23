import React from 'react';

import NavbarComponent from './navbar.component';
import WeatherManageComponent from './weather-manager.component';
import FooterComponent from './footer.component';

const HomeComponent = () => {

    return <>
        <NavbarComponent />
        <WeatherManageComponent />
        <FooterComponent />
    </>
};

export default HomeComponent;
