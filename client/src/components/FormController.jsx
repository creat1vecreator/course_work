import React, {useState} from 'react';
import {BuyForm} from "./BuyForm";
import {RentForm} from "./RentForm";
import {TypeOfPurchase} from "./utils/TypeOfPurchase";
import styled from 'styled-components';
import {useField} from "formik";
import {CustomSelect} from "./utils/CustomSelect";
import axios from "axios";


const ShowButton = styled.button.attrs(props => ({
    className: props.className,
}))`
  background: #4CACE3;
  color: #FFFFFF;
  width: 221px;
  height: 80px;
  font-size: 100%;
`;

const CheckboxWrapper = styled.div`
  margin-right: 10px;
  background: #E5EFFA;
  border-radius: 100px;
  padding: 10px;
  opacity: 0.5;
  cursor: pointer;

`;


const FormMainSection = styled.div.attrs(props => ({
    className: `form-${props.className}`
}))`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: auto 35px;

  &::after {
    content: "";
    border: 1px solid #4CACE3;
    filter: blur(2px);
    height: 80px;
  }

  label {
    margin-right: 5px;
  }


`;

const FormAdditionalSection = styled.div.attrs(props => ({
    className: `form-${props.className}`
}))`

  display: flex;
  width: inherit;
  margin: 10px auto;

  & > * {
    display: flex;
    align-items: center !important;
    justify-content: center !important;
    text-align: center;
  }

  .is-checked {
    background: #F8A655;
    opacity: 1;
    text-align: center !important;
    justify-content: center;
  }


  .form_additional-section-name {
    margin-right: 100px;
    box-sizing: border-box;
    width: 150px;
  }
  
`;

const AccordionFormWrapper = styled.div`

  input {
    background: rgba(255, 255, 255, 0.7);
    border-radius: 100px;
    border: inherit;
    height: 33px;
    width: 100px;
    text-align: center;
    font-size: 18px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:focus {
      outline: none;
    }
  }

  input[type='checkbox'] {
    -webkit-appearance: none;
    width: 0px;
    height: 0px;

  }

  btn btn-submit {
    background: #4CACE3;
    border-radius: 100px;
    border: inherit;
    color: #FFFFFF;
    width: 221px;
    height: 80px;
  }


  .MuiAccordion-root {
    background: #D7E8F9 !important;
    border-radius: 20px !important;
    box-shadow: none !important;


  }

  .Mui-focusVisible {
    background: #D7E8F9 !important;
  }

  .MuiAccordionSummary-root {
    border-radius: 100px !important;
    cursor: default !important;
    display: flex;

    .MuiAccordionSummary-content {
      justify-content: space-between;
    }
  }

  .MuiAccordionSummary-gutters {
    margin: 0 !important;
  }

  .MuiAccordionDetails-root {
    background: #D7E8F9;
    border-radius: 100px !important;
    -webkit-appearance: none;

  }
`;


const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input type='number' className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};

const colorizingCheckbox = (evt) => {
    console.log(evt.target.parentElement);
    evt.target.parentElement.classList.toggle('is-checked');
}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <div>
            <label className="checkbox-input">
                <CheckboxWrapper onChange={colorizingCheckbox}>
                    {children}
                    <input type="checkbox" {...field} {...props} />
                </CheckboxWrapper>
            </label>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}


        </div>
    );
};

const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    );
};


export const SelectField = ({

                                options,
                                field,
                                form,
                                placeholder,
                            }) => {
    return (
        <div>
            <CustomSelect
                options={options}
                name={field.name}
                value={options ? options.find(option => option.value === field.value) : ''}
                onChange={(option) => form.setFieldValue(field.name, option.value)}
                onBlur={field.onBlur}
                placeholder={placeholder}
                isSearchable={false}
                components={{IndicatorSeparator: () => null}}
            />

        </div>
    )
};


export const FormController = ({realEstates, setRealEstates}) => {
    const [typeOfPurchase, setTypeOfPurchase] = useState('Купить');

    const purchaseHandler = (evt) => {
        setTypeOfPurchase(evt.target.value);
        console.log(evt.target);
        evt.target.style = 'background: #FDA44B;'
        evt.target.nextSibling
            ? evt.target.nextSibling.style = 'background: #E5EFFA;'
            : evt.target.previousSibling.style = 'background: #E5EFFA;';
    }

    return (
        <div>

            <TypeOfPurchase purchaseHandler={purchaseHandler}/>
            {
                typeOfPurchase === 'Купить' ?
                    <BuyForm
                        AccordionFormWrapper={AccordionFormWrapper}
                        MyTextInput={MyTextInput}
                        MyCheckbox={MyCheckbox}
                        MySelect={MySelect}
                        ShowButton={ShowButton}
                        FormMainSection={FormMainSection}
                        FormAdditionalSection={FormAdditionalSection}
                        CheckBoxWrapper={CheckboxWrapper}
                        SelectField={SelectField}
                        realEstates={realEstates}
                        setRealEstates={setRealEstates}
                        typeOfPurchase={typeOfPurchase}

                    /> :
                    <RentForm
                        AccordionFormWrapper={AccordionFormWrapper}
                        MyTextInput={MyTextInput}
                        MyCheckbox={MyCheckbox}
                        MySelect={MySelect}
                        ShowButton={ShowButton}
                        FormMainSection={FormMainSection}
                        FormAdditionalSection={FormAdditionalSection}
                        CheckBoxWrapper={CheckboxWrapper}
                        SelectField={SelectField}
                        realEstates={realEstates}
                        setRealEstates={setRealEstates}
                        typeOfPurchase={typeOfPurchase}

                    />

            }

        </div>


    );

};

