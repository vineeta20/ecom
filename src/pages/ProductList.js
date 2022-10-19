import styled from "styled-components";
import NavBar from "../components/NavBar";
import Announcement from "../components/Announcement";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../Responsive";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../Store/product";
import { useState } from "react";
const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;
const P = styled.p`
  display: flex;
  justify-content: center;
  font-weight: 1000;
  font-size: 40px;
  margin-bottom: 20px;
`;
const ProductList = () => {
  const [sizeState, setSizeState] = useState("Size");
  const [colorState, setColorState] = useState("Color");

  const category = useSelector((state) => state.product.category);
  const items = useSelector((state) => state.product.items);
  const dispatch = useDispatch();

  const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  const createFilter = (type) => {
    if (category === "All") {
      return new Set(items.reduce((acc, prod) => [...acc, ...prod[type]], []));
    } else {
      return new Set(
        items
          .filter((prod) => prod.category.includes(category.toLowerCase()))
          .reduce((acc, prod) => {
            return [...acc, ...prod[type]];
          }, [])
      );
    }
  };

  let color = createFilter("color");
  color = [...color];

  let size = createFilter("size");
  size = [...size];

  const resetClickHandler = () => {
    dispatch(productActions.resetFilters());
    setColorState("Color");
    setSizeState("Size");
  };
  const changeHandler = (e) => {
    const val = e.target.value;
    const type = e.target.outerText.split("\n")[0].toLowerCase();

    if (type === "color") {
      setColorState(e.target.value);
      dispatch(productActions.filterItems({ color: val, size: sizeState }));
    } else if (type === "size") {
      setSizeState(e.target.value);
      dispatch(productActions.filterItems({ color: colorState, size: val }));
    }
  };

  return (
    <Container>
      <NavBar />
      <Announcement />
      <Title>{capitalize(category)}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select value={colorState} onChange={changeHandler}>
            <Option value="color">Color</Option>
            {color.map((col) => (
              <Option key={col} value={col}>
                {capitalize(col)}
              </Option>
            ))}
          </Select>
          <Select value={sizeState} onChange={changeHandler}>
            <Option value="size">Size</Option>
            {size.map((siz) => (
              <Option key={siz} value={siz}>
                {siz}
              </Option>
            ))}
          </Select>
        </Filter>
        <Filter>
          <FilterText style={{ cursor: "pointer" }} onClick={resetClickHandler}>
            Remove filters
          </FilterText>
        </Filter>
      </FilterContainer>
      {items && <Products sizeState={sizeState} colorState={colorState} />}
      {items[0] === undefined && <P>No Products Available</P>}
      <Footer />
    </Container>
  );
};

export default ProductList;
