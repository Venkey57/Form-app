import React, { Component } from 'react'
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Container, Row, Col } from 'reactstrap'
import axios from 'axios'

class Tables extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Server: [],
            NewBookModal: false,
            info:{
                Name: '',              
                Email: '', 
                Number: '',
                Age:'',
                DOB:'',
                Password:'',
                Gender:''
                
              }
        }
        // this.toggleBook=this.toggleBook.bind(this)
    }
    toggleBook(){
        this.setState({NewBookModal:!this.state.NewBookModal})
    }
    componentDidMount() {
        this.refreshData()
    }

    refreshData() {
        let { Server } = this.state
        axios.get('http://localhost:3005/datas').then((res) => {
            Server = res.data

            this.setState({ Server })
        })
    }
    delete(id){
        let { Server } = this.state
        axios.delete('http://localhost:3005/datas/'+id).then((res)=>{
            this.refreshData()

        })
    }
    showData(Name,Email,Number,Age,DOB,Password,Gender){
        this.setState({
            NewBookModal:!this.state.NewBookModal,
            info:{Name,Email,Number,DOB,Age,Gender,Password}
        })
    }
    render() {

        let { Server } = this.state
        console.log(Server)
        let data = Server.map((value, index) => {
            return (
                <tr key={index}>
                    <td>{value.id}</td>
                    <td>{value.Name}</td>
                    <td style={{}}>
                        <Button className='bg-primary' size='sm' onClick={this.showData.bind(this,value.Name,value.Email,value.Number,value.Age,value.DOB,value.Password,value.Gender)}>Click</Button>
                        
                    </td>
                    <td><Button className='bg-danger' size='sm' onClick={this.delete.bind(this,value.id)}>Del</Button></td>

                </tr>
            )
        })
        return (
            <>
                <div>

                    <Row>
                        <Col>
                            <Table>
                                <thead>
                                    <tr>
                                        <td>S.No</td>
                                        <td>Name</td>
                                        <td>View Details</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                </div>
                <Modal isOpen={this.state.NewBookModal}  >
                    <ModalHeader >view your Details</ModalHeader>
                    <ModalBody>
                        <Table>
                            <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>{this.state.info.Name}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{this.state.info.Email}</td>
                                    </tr>
                                    <tr>
                                        <td>Contact</td>
                                        <td>{this.state.info.Number}</td>
                                    </tr>
                                    <tr>
                                        <td>Age</td>
                                        <td>{this.state.info.Age}</td>
                                    </tr>
                                    <tr>
                                        <td>DOB</td>
                                        <td>{this.state.info.DOB}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>{this.state.info.Gender}</td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td>{this.state.info.Password}</td>
                                    </tr>                                
                            </thead>
                            
                        
                        </Table>
                        </ModalBody>
                        <ModalFooter><Button className='bg-danger' onClick={this.toggleBook.bind(this)}>Close</Button></ModalFooter>
                </Modal>


            </>
        )
    }
}
export default Tables;