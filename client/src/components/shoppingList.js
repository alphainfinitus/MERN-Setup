import React, { Component } from "react";
import { ListGroup, ListGroupItem, Container, Button, Media } from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class AppShoppingList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  OnClickDelete = id => {
    this.props.deleteItem(id);
  };

  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  render() {
    const { items } = this.props.item;
    return (
      <div>
        <Container className="mb-3">
          <ListGroup className="px-2">
            {items.map(({ _id, name, author, desc }) => (
              <ListGroupItem className="px-4" key={_id}>
                <Media>
                  <Media left className="mr-3">
                    {this.props.isAuthenticated ? (
                      <Button
                        color="dark"
                        onClick={this.OnClickDelete.bind(this, _id)}
                      >
                        &#x2713;
                      </Button>
                    ) : (
                      "> "
                    )}
                  </Media>
                  <Media body>
                    <Media heading>
                      {name}
                      <small className="ml-2">
                        <i className="text-capitalize">{author}</i>
                      </small>
                    </Media>
                    {desc}
                  </Media>
                </Media>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Container>
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
  { getItems, deleteItem }
)(AppShoppingList);
