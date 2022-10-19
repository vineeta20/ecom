import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../Responsive";
import { productActions } from "../Store/product";

const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    const x = e.target.innerText.split("'");
    dispatch(productActions.changeCategory(x[0]));
  };
  return (
    <Container>
      <Left>
        <Logo>ECOM.</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>
            <Link style={{ color: "black", textDecoration: "none" }} to="/">
              Home
            </Link>{" "}
          </ListItem>
          <ListItem>
            <Link style={{ color: "black", textDecoration: "none" }} to="/cart">
              Cart
            </Link>
          </ListItem>
          <ListItem key="men">
            <Link
              to="/productList"
              style={{ color: "black", textDecoration: "none" }}
              onClick={clickHandler}
            >
              Men's Fashion
            </Link>{" "}
          </ListItem>
          <ListItem>
            <Link
              to="/productList"
              style={{ color: "black", textDecoration: "none" }}
              onClick={clickHandler}
            >
              Women's Fashion
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/productList"
              style={{ color: "black", textDecoration: "none" }}
              onClick={clickHandler}
            >
              Accessories
            </Link>
          </ListItem>
          {/* <ListItem>My Account*</ListItem>
          <ListItem>Order Tracking*</ListItem>
          <ListItem>Blogs*</ListItem>
          <ListItem>Wishlist*</ListItem>
          <ListItem>Terms*</ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />A 1003, 1004 Empire Business
          Hub, Science City Rd, Ahmedabad, Gujarat 380060
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +91 987654321
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@ecom.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
