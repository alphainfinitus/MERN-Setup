import React, { Component } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addItem } from "../actions/itemActions";

class AppJumbotron extends Component {
  state = {
    modal: false,
    name: "",
    author: "",
    desc: "",
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newItem = {
      name: this.state.name,
      desc: this.state.desc,
    };

    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div>
        <Jumbotron>
          <Container>
            <h1 className="display-3">Collab List</h1>
            <p className="lead ml-2">The shopping list for groups :)</p>
            <hr className="my-2" />
            <p>
              Only you can take it off the list, or the administrator shopper.
            </p>
            <br />
            <p className="lead">
              {this.props.isAuthenticated ? (
                <Button color="primary" onClick={this.toggle}>
                  Add Item
                </Button>
              ) : (
                " * Login to manage the list"
              )}
            </p>
          </Container>

          <Modal isOpen={this.state.modal} toggle={this.toggle} centered={true}>
            <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>

            <Form onSubmit={this.onSubmit}>
              <ModalBody>
                <Input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  onChange={this.onChange}
                />
                <hr className="my-2" />
                <Input
                  type="textarea"
                  name="desc"
                  placeholder="Item description or any supporting text."
                  onChange={this.onChange}
                  rows={3}
                />
              </ModalBody>

              <ModalFooter>
                <Button color="primary" type="submit">
                  Submit Item
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Form>
          </Modal>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { addItem }
)(AppJumbotron);
