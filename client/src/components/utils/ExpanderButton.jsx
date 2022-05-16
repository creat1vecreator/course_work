import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";

const ExpanderBtn = styled.button.attrs({
    id: 'expander',
    type: 'button',

})`
  background: #D7E8F9;
  border: none;
`;
const ExpanderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer !important;
`;

export const ExpanderButton = () => {

    return (
        <ExpanderWrapper>
            <ExpanderBtn>
                <ExpandMoreIcon/>
            </ExpanderBtn>
        </ExpanderWrapper>

    );
};
