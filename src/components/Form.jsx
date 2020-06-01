import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class FormContainer extends Component {

  state = {
    username: "",
    password: "",
    confirmation: "",
    confirationError: false,
    msg: undefined
  }

  handleErrors = (submitResponse) => {
    console.log(submitResponse);
  }

  handleSubmitButton = (e) => {
    e.preventDefault()

    if (this.props.error) {
      let errorMessage = ' '
      this.props.error.map(errorMsg => errorMessage += errorMsg)
      this.setState({msg: errorMessage})
    }

    const user = {username: this.state.username, password: this.state.password}

    if (this.props.formName === "Sign up"){
      this.state.password === this.state.confirmation ? this.props.handleSubmit(user) : this.setState({msg: "Passwords do not match.", confirationError: true})
      // console.log("will compaare");
    } else {
      this.props.handleSubmit(user)
      // console.log("will not compare");
    }
  }

  handleChange = (e) => {
    // removes any error messages
    this.setState({confirationError: false, msg: undefined})

    this.setState({
      [e.target.placeholder]: e.target.value
    })
  }

  render() {
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src='/icons/train-logo-192.png' /> { this.props.formName }
            </Header>
            <Form size='large' onSubmit={ this.handleSubmitButton }>
              <Segment stacked>
                {
                  this.props.formName === "Login"
                  ?
                    <>
                      <Form.Input onChange={ this.handleChange }fluid icon='user' iconPosition='left' placeholder='username' />
                      <Form.Input
                        fluid
                        onChange={ this.handleChange }
                        icon='lock'
                        iconPosition='left'
                        placeholder='password'
                        type='password'
                        />
                    </>
                  :
                  <>
                    <Form.Input onChange={ this.handleChange }fluid icon='user' iconPosition='left' placeholder='username' />
                    <Form.Input
                      fluid
                      onChange={ this.handleChange }
                      icon='lock'
                      iconPosition='left'
                      placeholder='password'
                      type='password'
                      />
                    <Form.Input
                      fluid
                      onChange={ this.handleChange }
                      icon='lock'
                      iconPosition='left'
                      label='Re-enter password'
                      placeholder='confirmation'
                      type='password'
                      error={this.state.confirationError}
                      />
                  </>
                }

              <Button color='blue' fluid size='large'>
                  { this.props.formName }
                </Button>
              </Segment>
            </Form>

            {
              this.state.msg
              ?
              <Message>
                <p style={{color: 'red'}}>{this.state.msg}</p>
              </Message>
              :
              null
            }

            <Message>
              {
                this.props.formName === "Login"
                ?
                <div>New to us? <a href='https://subwaytimes.herokuapp.com/signup'>Sign Up</a></div>
                :
                <div>Already have an account? <a href='https://subwaytimes.herokuapp.com/login'>Login</a></div>
              }
            </Message>
          </Grid.Column>
        </Grid>
    );
  }

}

export default FormContainer;
