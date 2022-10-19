import { Badge } from "@mui/material";
import { Search, LocalMallOutlined } from "@mui/icons-material";
import React, { useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../Store/product";
import { loggedInAction } from "../Store/loggedIn";

const Container = styled.div`
  height: 60px;
  /* background-color: black; */
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  padding: 5px;
  margin-left: 25px;
`;
const Input = styled.input`
  border: none;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  text-decoration: none;
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const searchRef = useRef();

  const loggedin = useSelector((state) => state.loggedIn.loggedin);

  const searchClickHandler = () => {
    dispatch(productActions.changeCategory(searchRef.current.value));
    searchRef.current.value = "";
    naviagte("/productList");
  };

  const clickHandler = () => {
    dispatch(productActions.changeCategory("All"));
  };

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const logOutHandler = () => {
    localStorage.removeItem("login", "true");
    dispatch(loggedInAction.changeLoginStatus());
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input ref={searchRef} />{" "}
            <Search
              onClick={searchClickHandler}
              style={{ color: "gray", fontSize: "16px" }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              ECOM.
            </Link>
          </Logo>
        </Center>
        <Right>
          <MenuItem>
            <Link
              onClick={clickHandler}
              to="/productList"
              style={{ color: "black", textDecoration: "none" }}
            >
              All products
            </Link>
          </MenuItem>
          {!loggedin && (
            <>
              <MenuItem>
                <Link
                  to="/signUp"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="/login"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  Login In
                </Link>
              </MenuItem>
            </>
          )}
          {loggedin && <MenuItem onClick={logOutHandler}>Log Out</MenuItem>}
          <MenuItem>
            <Badge badgeContent={totalQuantity} color="primary">
              <Link
                to="/cart"
                style={{ color: "black", textDecoration: "none" }}
              >
                <LocalMallOutlined />
              </Link>
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
