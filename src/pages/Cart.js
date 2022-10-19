import { Link } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { cartAction } from "../Store/cart";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border: 0.5px solid black;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 30px;
  ${mobile({ marginBottom: "20px" })}
`;
const Remove = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const EmptyCheckout = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Cart = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    dispatch(cartAction.remove(id));
  };
  return (
    <Container>
      <NavBar />
      <Announcement />
      {totalQuantity <= 0 && (
        <Wrapper style={{ textAlign: "center" }}>
          <Title>YOUR BAG IS EMPTY</Title>
          <EmptyCheckout style={{ marginTop: "40px", marginBottom: "30vh" }}>
            <Link
              to="/productList"
              style={{ color: "black", textDecoration: "none" }}
            >
              CONTINUE SHOPPING
            </Link>
          </EmptyCheckout>
        </Wrapper>
      )}
      {totalQuantity > 0 && (
        <Wrapper>
          <Title>YOUR BAG</Title>
          <Top>
            <TopButton>
              <Link
                to="/productList"
                style={{ color: "black", textDecoration: "none" }}
              >
                CONTINUE SHOPPING
              </Link>
            </TopButton>
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              {items.map((item) => (
                <React.Fragment key={item.id}>
                  <Product>
                    <ProductDetail>
                      <Image src={item.image} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {item.productName}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {item.id}
                        </ProductId>
                        <ProductColor color={item.color} />
                        <ProductSize>
                          <b>Size:</b> {item.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <ProductAmount>X {item.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>₹ {item.totalPrice}</ProductPrice>
                      <Remove
                        type="filled"
                        onClick={() => {
                          removeHandler(item.id);
                        }}
                      >
                        Remove Item
                      </Remove>
                    </PriceDetail>
                  </Product>
                  <Hr />
                </React.Fragment>
              ))}
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice}</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping</SummaryItemText>
                <SummaryItemPrice> 500</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Shipping Discount</SummaryItemText>
                <SummaryItemPrice>₹ -500</SummaryItemPrice>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>₹ {totalPrice - 500}</SummaryItemPrice>
              </SummaryItem>
              <Button>CHECKOUT NOW</Button>
            </Summary>
          </Bottom>
        </Wrapper>
      )}{" "}
      <Footer />
    </Container>
  );
};

export default Cart;
