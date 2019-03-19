import React from "react";
import { connect } from "react-redux";
import * as productActions from "../../redux/actions/productActions";
import * as businessActions from "../../redux/actions/businessActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ProductList from "./ProductList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ProductsPage extends React.Component {
  state = {
    redirectToAddProductPage: false
  };
  componentDidMount() {
    const { products, businesses, actions } = this.props;

    if (products.length === 0) {
      actions.loadProducts().catch(error => {
        alert("Loading products failed" + error);
      });
    }

    if (businesses.length === 0) {
      actions.loadBusinesses().catch(error => {
        alert("Loading businesses failed" + error);
      });
    }
  }

  handleDeleteProduct = async product => {
    toast.success("Product deleted");
    //can also use try/catch for readability
    try {
      await this.props.actions.deleteProduct(product);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddProductPage && <Redirect to="/product" />}
        <h2>Products</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddProductPage: true })}
            >
              Add Product
            </button>
            <ProductList
              onDeleteClick={this.handleDeleteProduct}
              products={this.props.products}
            />
          </>
        )}
      </>
    );
  }
}

ProductsPage.propTypes = {
  products: PropTypes.array.isRequired,
  businesses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    products:
      state.businesses.length === 0
        ? []
        : state.products.map(product => {
            return {
              ...product,
              businessName: state.businesses.find(
                a => a.id === product.businessId
              ).name
            };
          }),
    businesses: state.businesses,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadProducts: bindActionCreators(productActions.loadProducts, dispatch),
      loadBusinesses: bindActionCreators(
        businessActions.loadBusinesses,
        dispatch
      ),
      deleteProduct: bindActionCreators(productActions.deleteProduct, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsPage);
