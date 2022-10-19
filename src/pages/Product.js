import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { mobile } from "../Responsive";
import { useState } from "react";
import { cartAction } from "../Store/cart";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 0.5px solid black;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const item = useSelector((state) => state.item.item);
  const [quantity, setQuantity] = useState(item.quantity);
  const [size, setSize] = useState(item.size[0]);
  const [color, setColor] = useState(item.color[0]);
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    if (quantity === 0) {
      dispatch(cartAction.remove(item.id));
    } else {
      dispatch(
        cartAction.add({
          productName: item.productName,
          price: item.price,
          quantity: quantity,
          id: item.id,
          color: color,
          size: size,
          image: item.img,
        })
      );
    }
  };
  return (
    <Container>
      <NavBar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={item.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{item.productName}</Title>
          <Desc>{item.desc}</Desc>
          <Price>₹ {item.price}</Price>
          <FilterContainer>
            {item.color[0] != null && (
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {item.color.map((col) => (
                  <FilterColor
                    onClick={(e) => {
                      setColor(e.target.outerHTML.split('"')[1]);
                    }}
                    key={col}
                    color={col}
                  />
                ))}
              </Filter>
            )}
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                {item.size.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              {quantity > 0 && (
                <Remove
                  onClick={() => {
                    setQuantity(quantity - 1);
                  }}
                />
              )}
              <Amount>{quantity}</Amount>
              <Add
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              />
            </AmountContainer>
            <Button onClick={addToCartHandler}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
