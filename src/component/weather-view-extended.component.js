import React, { useState, useEffect, useCallback } from 'react';
import * as publicIp from 'react-public-ip';

import { Card, ListGroup, ListGroupItem, Spinner, Row, Col, Image }  from 'react-bootstrap';

// react-slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const WeatherViewExtendedComponent = (props) => {

    const { id } = props;
    
    const [ weathers, setWeathers ] = useState('');

    const getCurrentWeather = useCallback(async () => {
        const ipv4 = await publicIp.v4() || "";
        const queryCurrent = `${process.env.REACT_APP_HOST}forecast?ip=${ipv4}`;

        console.log(queryCurrent)
        fetch(queryCurrent)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setWeathers(data)
        });

    }, []);

    const getSelectedWeather = useCallback(async (id) => {
        setWeathers(null)
        const ipv4 = await publicIp.v4() || "";
        const queryCurrent = `${process.env.REACT_APP_HOST}forecast/${id}?ip=${ipv4}`;

        console.log(queryCurrent)
        fetch(queryCurrent)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setWeathers(data)
        });

    }, []);

    useEffect(() => {

        if (id) {
            getSelectedWeather(id);
        } else {
            getCurrentWeather()
        }
        
    }, [getCurrentWeather, getSelectedWeather, id]);


    var settings = {
        dots: (window.screen.width > 1000 ) ? true : false,
        infinite: true,
        speed: 500,
        slidesToShow: (window.screen.width > 1000 ) ? 3 : 1,
        slidesToScroll:  (window.screen.width > 1000 ) ? 3 : 1
    };

    return  weathers ? <Slider {...settings}> {
         weathers.list.map((weather, index) => {
        return <div  key={`container-${index}`}>
            <Card style={{ width: '18rem' }} key={`card-${index}`}>
                <Card.Body>
                <Card.Title> 
                    <p>{ weathers.city.name} </p>
                    <p>{ weather.dt_txt.substring(0, weather.dt_txt.length -3 ) }</p>
                </Card.Title>
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
            </Card>
        </div>;
    })
    }
    </Slider> : <Spinner animation="border" /> ;
};

export default WeatherViewExtendedComponent;
