import {
  // FavoriteBorderOutlined,
  SearchOutlined,
  LocalMallOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { itemActions } from "../Store/selectItem";
import { cartAction } from "../Store/cart";
const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-size: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item, colorState, sizeState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchClickHandler = () => {
    dispatch(itemActions.selectItem(item));
    navigate("/product");
  };
  const addClickHandler = () => {
    if (sizeState === "Size" && colorState === "Color") {
      dispatch(
        cartAction.add({
          productName: item.productName,
          price: item.price,
          quantity: 1,
          id: item.id,
          color: item.color[0],
          size: item.size[0],
          image: item.img,
        })
      );
    } else if (colorState === "Color") {
      console.log(item.color[0]);
      dispatch(
        cartAction.add({
          productName: item.productName,
          price: item.price,
          quantity: 1,
          id: item.id,
          color: item.color[0],
          size: sizeState,
          image: item.img,
        })
      );
    } else if (sizeState === "Size") {
      dispatch(
        cartAction.add({
          productName: item.productName,
          price: item.price,
          quantity: 1,
          id: item.id,
          color: colorState,
          size: item.size[0],
          image: item.img,
        })
      );
    } else {
      dispatch(
        cartAction.add({
          productName: item.productName,
          price: item.price,
          quantity: 1,
          id: item.id,
          color: colorState,
          size: sizeState,
          image: item.img,
        })
      );
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <LocalMallOutlined onClick={addClickHandler} />
        </Icon>
        <Icon>
          <SearchOutlined onClick={searchClickHandler} />
        </Icon>
        {/* <Icon><FavoriteBorderOutlined /></Icon> */}
      </Info>
    </Container>
  );
};

export default Product;
