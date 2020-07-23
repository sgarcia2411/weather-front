import React, { useState } from 'react';

// selector redux
import { useSelector } from 'react-redux'

// Bootstrap
import { Row, Col } from 'react-bootstrap';

// typeahead
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import { Highlighter } from 'react-bootstrap-typeahead'

import 'react-bootstrap-typeahead/css/Typeahead.css';

// custom component
import WeatherViewComponent from './weather-view.component';
import WeatherViewExtendedComponent from './weather-view-extended.component';

const AsyncTypeahead = withAsync(Typeahead);

const WeatherManageComponent = () => {

    const citylist = useSelector(state => state.default.cities.default)

    // state
    const [ citiesOption, setCitiesOption ] = useState([]);
    const [ cityId, setCityId ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const onChangeCity = (city) => {
        if(!city || city.length === 0) {
            return;
        }
        
        console.log('onChangeCity', city[0])
        setCityId(city[0].id);
    };

    const citySearch = (value) => {
        setIsLoading(true);
        const cities = citylist
            .filter(city => city.name.toLowerCase().includes(value))
            .map(city => {
                return {
                    id: city.id,
                    name: city.name,
                    country: city.country,
                    state: city.state
                };
            })

        setCitiesOption(cities);
        setIsLoading(false);
    }

    const renderMenuItemCityChildren = (option, props, index) => {
        return [
            <Highlighter key="name" search={props.text}>
                {option.name}
            </Highlighter>,
            <div key="info">
                <small>
                    Country: {option.country}
                </small>
            </div>
        ];
    }

    return <Row className="mt-5">
        <Col md={6}>
            <Row>
                <Col sm={"auto"} className="d-flex align-items-center">
                    <strong>City:</strong>
                </Col>
                <Col>
                    <AsyncTypeahead
                        id="basic-typeahead-single"
                        onChange={onChangeCity}
                        options={citiesOption}
                        minLength={3}
                        placeholder="Search a city..."
                        labelKey={option => `${option.name}`}
                        onSearch={citySearch}
                        isLoading={isLoading}
                        renderMenuItemChildren={renderMenuItemCityChildren}
                    />
                </Col>
            </Row>
        </Col>
        <Col sm={12}  className="mt-5">
            <Row>
                <Col>
                    <WeatherViewComponent id={cityId} />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <h3>Weather extended - 5 days</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <WeatherViewExtendedComponent id={cityId} />
                </Col>
            </Row>
        </Col>
    </Row>
};

export default WeatherManageComponent;
