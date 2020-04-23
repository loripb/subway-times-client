import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class FormContainer extends Component {

  state = {
    username: "",
    password: ""
  }

  handleSubmitButton = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
  }

  handleChange = (e) => {
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
                <Form.Input onChange={ this.handleChange }fluid icon='user' iconPosition='left' placeholder='username' />
                <Form.Input
                  fluid
                  onChange={ this.handleChange }
                  icon='lock'
                  iconPosition='left'
                  placeholder='password'
                  type='password'
                />

              <Button color='blue' fluid size='large'>
                  { this.props.formName }
                </Button>
              </Segment>
            </Form>
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
