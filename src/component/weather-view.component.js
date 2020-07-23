import React, { useState, useEffect, useCallback } from 'react';
import * as publicIp from 'react-public-ip';

import { Card, ListGroup, ListGroupItem, Spinner, Row, Col, Image }  from 'react-bootstrap';


const WeatherViewComponent = (props) => {

    const { id } = props;
    
    const [ weather, setWeather ] = useState('');

    const getCurrentWeater = useCallback(async () => {
        const ipv4 = await publicIp.v4() || "";
        const queryCurrent = `${process.env.REACT_APP_HOST}current?ip=${ipv4}`;

        console.log(queryCurrent)
        fetch(queryCurrent)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setWeather(data)
        });

    }, []);

    const getSelectedWeather = useCallback(async (id) => {
        setWeather(null);
        const ipv4 = await publicIp.v4() || "";
        const queryCurrent = `${process.env.REACT_APP_HOST}current/${id}?ip=${ipv4}`;

        console.log(queryCurrent)
        fetch(queryCurrent)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setWeather(data)
        });

    }, []);

    useEffect(() => {

        if (id) {
            getSelectedWeather(id);
        } else {
            getCurrentWeater()
        }
        
    }, [getCurrentWeater, getSelectedWeather, id]);

    

    return weather ? <Card style={{ width: '18rem' }}>
        <Card.Body>
        <Card.Title> Now in { weather.name }</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>
                <Row>
                    <Col sm={3}>
                        <Image src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} rounded />
                    </Col>
                    <Col className="d-flex align-items-center">
                        Weather: { weather.weather[0].description }
                    </Col>
                </Row>
                
            </ListGroupItem>
            <ListGroupItem><strong>Temperature:</strong> { weather.main.temp }º</ListGroupItem>
            <ListGroupItem><strong>Feel like:</strong> { weather.main.feels_like }º</ListGroupItem>
            <ListGroupItem><strong>Temperature min:</strong> { weather.main.temp_min }º</ListGroupItem>
            <ListGroupItem><strong>Temperature max:</strong> { weather.main.temp_max }º</ListGroupItem>
            <ListGroupItem><strong>Presure:</strong> { weather.main.pressure } HP</ListGroupItem>
            <ListGroupItem><strong>Humidity:</strong> { weather.main.humidity }%</ListGroupItem>
        </ListGroup>
    </Card> : <Spinner animation="border" />;
};

export default WeatherViewComponent;
