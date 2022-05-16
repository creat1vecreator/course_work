import styled from "styled-components";
import Select from "react-select";

export const CustomSelect = styled(Select).attrs(props => ({
    ...props,
    styles: {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#D7E8F9',
            color: '#000000 !important',
            opacity: '1',
            borderRadius: '20px 20px;',
            padding: '',
            border: 'none',
            textAlign: 'center',
            boxShadow: 'none',
            height: '50px',
            cursor: 'pointer',

        }),
        option: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
            color: '#000000',
            backgroundColor: '#ffffff',
            border: 'none',

        }),
    },

}))`
  width: 200px;
  border: none;

  [class$=-placeholder] {
    color: black;
  }
  [class$=-menu] {
    border-radius: 20px 20px 20px 20px;
    visibility: hidden;

    & > * {
      visibility: visible;
      text-align: center;

      & > *:hover {
        color: #FFFFFF;
        background: #4CACE3;
      }
      
      & > *:first-child {
        border-radius: 20px 20px 0px 0px;
      }
      
      & > *:last-child {
        border-radius: 0px 0px 20px 20px;
      }
    }
  }
  
`;