import { useEffect, useState } from "react";

// Images
import cafe_home from "./assets/cafe_home.svg";

// Icons
import { MdShoppingCart } from "react-icons/md";
import { BsBoxSeamFill } from "react-icons/bs";
import { PiTimerFill, PiCoffeeFill } from "react-icons/pi";

//Components
import { CoffeList } from "../components/CoffesList";
import { styled } from "styled-components";

// Types
import { ICoffe } from "../types/Coffe";
import { api } from "../services/provider";
import { AxiosResponse } from "axios";

const Container = styled.main`
  overflow-x: hidden;
`;

const SectionCall = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 170px;
  @media (max-width: 575px) {
    margin-top: 50px;
  }
`;

const CallCoffesTitle = styled.h1`
  font-family: "Baloo 2", cursive;
  font-size: 48px;
  max-width: 600px;
  letter-spacing: -1px;
  line-height: 1em;
  margin: 0;
  margin-top: 20px;
  margin-left: 5px;
  font-weight: 800;
`;

const SecondCall = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 20px;
  font-weight: 400;
  max-width: 550px;
  color: #403937;
  margin: 10px 5px;
  line-height: 1.3em;
  padding: 0;
`;

const ItemsBenefits = styled.div`
  max-width: 600px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ItemBenefit = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 10px 0;
  width: 38%;
  > svg {
    color: ${(props) => props.color};
  }
  > p {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
  @media (max-width: 575px) {
    width: 100%;
    > p {
      margin-left: 45px;
    }
  }
`;

const IconBenefit = styled.i`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props) => props.color};
  position: absolute;
  left: -35px;
  @media (max-width: 575px) {
    left: 5px;
  }
`;

const ContentCoffes = styled.section`
  padding: 0;
`;

const CoffesCall = styled.h3`
  padding: 20px 0;
  font-family: "Baloo 2", cursive;
  font-size: 32px;
  font-weight: 800;
  text-align: center;
`;

const Home = () => {
  const [coffes, setCoffes] = useState<ICoffe[] | []>([]);

  const fetchData = async () => {
    api.get("/").then((response: AxiosResponse) => {
      setCoffes(response.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        <SectionCall>
          <div>
            <CallCoffesTitle>
              Encontre o café perfeito para qualquer hora do dia
            </CallCoffesTitle>
            <SecondCall>
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </SecondCall>
            <ItemsBenefits>
              <ItemBenefit>
                <IconBenefit color={"#C47F17"}>
                  <MdShoppingCart color={"#fff"} />
                </IconBenefit>
                <p>Compra simples e segura</p>
              </ItemBenefit>
              <ItemBenefit>
                <IconBenefit color={"#574F4D"}>
                  <BsBoxSeamFill color={"#fff"} />
                </IconBenefit>
                <p>Embalagem mantém o café intacto</p>
              </ItemBenefit>
              <ItemBenefit>
                <IconBenefit color={"#DBAC2C"}>
                  <PiTimerFill color={"#fff"} />
                </IconBenefit>
                <p>Entrega rápida e rastreável</p>
              </ItemBenefit>
              <ItemBenefit>
                <IconBenefit color={"#8047F8"}>
                  <PiCoffeeFill color={"#fff"} />
                </IconBenefit>
                <p>O café chega fresquinho até você</p>
              </ItemBenefit>
            </ItemsBenefits>
          </div>
          <div>
            <img src={cafe_home} alt="Chamada de café" />
          </div>
        </SectionCall>
        <ContentCoffes>
          <CoffesCall>Faça seu pedido</CoffesCall>
          <CoffeList coffes={coffes} />
        </ContentCoffes>
      </Container>
    </>
  );
};

export default Home;
