import { styled } from "styled-components";
import { IoAddSharp } from "react-icons/io5";

import { RiSubtractLine } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";

import { ICoffe } from "../types/Coffe";
import { useState } from "react";
import { api } from "../services/provider";

const CoffesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 100px;
`;

const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 15px;
  background-color: #f3f2f2;
  border-radius: 6px 36px;
  height: 310px;
  width: 256px;
  @media (max-width: 900px) {
    margin: 30px 3px;
  }
`;

const ImgCard = styled.img`
  margin-top: -35px;
  margin-bottom: 10px;
`;

const TitleCard = styled.h6`
  font-size: 24px;
  font-family: "Baloo 2", cursive;
  margin: 10px 0 0 0;
`;

const CategorySpan = styled.span`
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 100px;
  margin: 0 10px 10px 0;
  color: #c47f17;
  background-color: #f1e9c9;
`;

const ParagraphCard = styled.p`
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin: 5px 0;
  color: #8d8686;
  max-width: 190px;
`;

const PriceSpan = styled.span`
  font-family: "Baloo 2", cursive;
  font-size: 18px;
  margin-left: 3px;
  color: #574f4d;
`;

const ButtonsContainer = styled.div`
  display: flex;
  background: #e6e5e5;
  border-radius: 6px;
  margin: 0 10px;
  padding: 3px 0;
  > button {
    margin: 0 3px;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const BtnCart = styled.button`
  margin-left: 5px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  color: #fff;
  background: #4b2994;
  text-align: center;
  > svg {
    margin-top: 5px;
  }
  cursor: pointer;
`;

interface Props {
  coffes: ICoffe[];
}

export const CoffeList = ({ coffes }: Props) => {
  const [cartItems, setCartItems] = useState<ICoffe[]>([]);
  const [itemsAdd, setItemsAdd] = useState<ICoffe[]>([]);

  const handleAddItemToCart = (coffe: ICoffe) => {
    const existsItemToAdd = itemsAdd.find((item) => item.id === coffe.id);
    if (existsItemToAdd) {
      setCartItems([...cartItems, existsItemToAdd]);
    }
    try {
      if (existsItemToAdd) {
        handleSubmit(existsItemToAdd!);
        //console.log(existsItemToAdd, cartItems);
      }
    } catch (e) {
      console.log(`Ocorreu um erro ao adicionar o item ao carrinho, ${e}`);
    }
  };

  const handleSubmit = (coffeAdd: ICoffe) => {
    api.post("/delivery-items", coffeAdd).then(() => {
      console.log(coffeAdd);
    });
  };

  const handleAddCartItem = (coffe: ICoffe) => {
    setItemsAdd([...itemsAdd, coffe]);
    const existingCoffe = itemsAdd.find((item) => item.id === coffe.id);
    if (existingCoffe) {
      return existingCoffe.quantity++;
    }
  };

  const handleRemoveCartItem = (coffe: ICoffe) => {
    setItemsAdd([...itemsAdd, coffe]);
    const coffeExists = itemsAdd.find((item) => item.id === coffe.id);
    if (coffeExists!.quantity !== 0) {
      return coffeExists!.quantity--;
    }
    if (coffeExists!.quantity <= 0) {
      return setItemsAdd(itemsAdd.filter((item) => item.id !== coffe.id));
    }
  };

  return (
    <>
      <CoffesList>
        {coffes.length > 0
          ? coffes.map((coffe: ICoffe) => (
              <div>
                <ContainerCard>
                  <ImgCard
                    width={120}
                    src={`${coffe.photo_url}`}
                    alt="Imagem de café"
                  />
                  <div>
                    {coffe.categories.map((item) => (
                      <CategorySpan>{item}</CategorySpan>
                    ))}
                  </div>
                  <TitleCard>{coffe.title}</TitleCard>
                  <ParagraphCard>{coffe.description}</ParagraphCard>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h6>
                      R$
                      <PriceSpan>
                        <>{coffe.price}</>
                      </PriceSpan>
                    </h6>
                    <ButtonsContainer>
                      <button>
                        <RiSubtractLine
                          color={"#8047f8"}
                          style={{ fontSize: "16px" }}
                          onClick={() => handleRemoveCartItem(coffe)}
                        />
                      </button>
                      <>{coffe.quantity}</>
                      <button>
                        <IoAddSharp
                          color={"#8047f8"}
                          style={{ fontSize: "16px" }}
                          onClick={() => handleAddCartItem(coffe)}
                        />
                      </button>
                    </ButtonsContainer>
                    <BtnCart onClick={() => handleAddItemToCart(coffe)}>
                      <MdShoppingCart />
                    </BtnCart>
                  </div>
                </ContainerCard>
              </div>
            ))
          : "Loading"}
      </CoffesList>
    </>
  );
};
