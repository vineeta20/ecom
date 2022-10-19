import { useSelector } from "react-redux";
import styled from "styled-components";
// import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ sizeState, colorState }) => {
  const items = useSelector((state) => state.product.items);
  return (
    <Container>
      {items.map((item) => (
        <Product
          sizeState={sizeState}
          colorState={colorState}
          item={item}
          key={item.id}
        />
      ))}
    </Container>
  );
};

export default Products;
