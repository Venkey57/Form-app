import React,{Component} from 'react'
import axios from 'axios';
import './form.css'


class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Server: [],
      validationErrors:{},
      info:{
        Name: '',
        Age: '',
        Email: '',
        DOB: '',
        Number: '',
        Password: '',
        Gender: '',
        File: '',
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    const target = event.target
    const name = target.name
    const ans = target.value
    let {info}=this.state
    info[name]=ans

    this.setState({
      info
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    let {Name,DOB,Number,Email,Password,Gender,File}=this.state.info
    let Age = new Date().getFullYear() -new Date(DOB).getFullYear()
    axios.post('http://localhost:3005/datas',{Name,Age,Number,DOB,Email,Password,Gender,Time:new Date()}).then((res)=>{
      this.state.Server.push(res.data)
    this.setState({
      info:{
        Name:'', DOB:'',Number:'',Email:'',Password:'',File:'',Gender:''
      }
    })
    })
    const isFormValidate=this.validate()

    console.log(isFormValidate)
    if(isFormValidate){
    console.log(Name,DOB,Number,Email,Password,Gender)}
  }

  validate(){
    let {Name,DOB,Number,Email,Password,Gender,File}=this.state.info
    const error={}
    if(!Name){
      error['NameError']='*Enter Your Name'
    }
    else if(Name.length<3){
      error['NameError']='*Atleast name is more than 3 charter'
    }
    else if(Name.length>15){
      error['NameError']='*Atleast name is less than 15 charter'
    }
    if(!Email){
      error['EmailError']='*Enter your Email Id'
    }
    if(!Password){
      error['PasswordError']='*Enter the Password'
    }
    if(!Gender){
      error['GenderError']='*Select your Gender'
    }
    if(!DOB){
      error['DOBError']='*Fill your Date of Birth '
    }
    
    

    this.setState({
      validationErrors:error
    })
    return Object.keys(error).length===0
  }

  render() {
    const {NameError,EmailError,PasswordError,GenderError,DOBError}=this.state.validationErrors
     let {Name,DOB,Number,Email,Password,File,Gender}=this.state.info
    return (
      <>
        <h3 className='header'>Form Submitions</h3>
        <form className='container' onSubmit={this.handleSubmit}>
          <label htmlFor='Name'>Name</label>
          <input type={'text'} name='Name'id="Name" value={Name} autoComplete='off' onChange={this.handleChange}></input>
          <span>{NameError}</span>
          <label htmlFor="Email">Email</label>
          <input type={'email'} name="Email" id='Email' value={Email} autoComplete='off' onChange={this.handleChange} ></input>
           <span>{EmailError}</span>
          <label htmlFor="Number">Number</label>
          <input type={'tel'} name="Number" id='Number' value={Number} autoComplete='off' onChange={this.handleChange}></input>
          <label htmlFor="Password">PassWord</label>
          <input type={'password'} name="Password" id='Password' value={Password} onChange={this.handleChange}></input>
          <span>{PasswordError}</span>
          <div>
            <label htmlFor='Male'>Male</label>
            <input id='Male' type='radio' name='Gender' value="Male" onChange={this.handleChange} ></input>
            <label htmlFor='Female'>Female</label>
            <input id='Female' type='radio' name='Gender' value='Female' onChange={this.handleChange}></input>
            <span>{GenderError}</span>
          </div>
          <label htmlFor='DOB' >Date of Birth</label>
          <input id='DOB' type={'date'} name='DOB'value={DOB} onChange={this.handleChange}></input>
          <span>{DOBError}</span>
          <label htmlFor='File'>Resume</label>
          <input type={'file'} id='File' name='File' value={File} onChange={this.handleChange}></input>
          <button type='submit'>submit</button>
        </form>

      </>
    )
  }
}

export default Form;