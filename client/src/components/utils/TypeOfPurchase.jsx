import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import {REFRESH_DB} from "../../routes";

const TypeOfPurchaseWrapper = styled.div`
`;

const ButtonUpSection = styled.button`
  margin-right: 8px;
  background: ${props => props.background || "#E5EFFA"};
  width: 160px;
  height: 50px;
  font-size: 20px;
  line-height: 27px;

  [disabled] {
    background: #F4A7B5 !important;
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  justify-content: space-between;

`;
const refreshDb = async (evt) => {
    evt.target.disabled = true;
   const btnSubmit = document.querySelector('button[type=submit]');
   btnSubmit.disabled = true;

    const response = await axios.get(REFRESH_DB).then(res => {
        evt.target.disabled = false;
        btnSubmit.disabled = false;
        console.log('message from server:',res.data.message);

    });
}

export const TypeOfPurchase = ({purchaseHandler}) => {
    return (
        <Wrapper>
            <TypeOfPurchaseWrapper>
                <ButtonUpSection value={"Купить"} onClick={purchaseHandler} background={"#FDA44B"}>
                    Купить
                </ButtonUpSection>

                <ButtonUpSection value={"Снять"} onClick={purchaseHandler}>
                    Снять
                </ButtonUpSection>
            </TypeOfPurchaseWrapper>

            <ButtonUpSection background={'#A9F3C8'} onClick={refreshDb}>
                Обновить БД
            </ButtonUpSection>

        </Wrapper>
    );
};

