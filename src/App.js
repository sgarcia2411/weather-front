import React from 'react';

//redux 
import { Provider } from 'react-redux';
import { store } from './redux/redux';

// Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import HomeComponent from './component/home.component';

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Provider store={store}>
            <HomeComponent />  
          </Provider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
