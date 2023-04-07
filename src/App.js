import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col} from "reactstrap"
import Form from './form'
import Tables from './table'

function App() {

    return (
        <div style={{
            // display: 'block', width: 900,
            //  padding: 30
        }}>
                <Row >
                    <Col xs="4" ><Form></Form></Col>
                    <Col xs="8" ><Tables></Tables></Col>
                </Row>
            
               
              
            
        </div >
    );
}

export default App;
