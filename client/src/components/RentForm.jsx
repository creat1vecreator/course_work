import React, {useState} from 'react';
import {Field, Form, Formik} from 'formik';
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {ExpanderButton} from "./utils/ExpanderButton";
import styled from "styled-components";
import { getRealEstatesByParamsRent} from "../api/requests";

const optionsTypeOfObjects = [
    {value: 'secondary', label: 'Вторичка'},
    {value: 'newBuilding', label: 'Новостройка'},
];

const optionsRooms = [
    {value: 'studio', label: 'Студия'},
    {value: '1', label: '1'},
    {value: '2', label: '2'},
    {value: '3', label: '3'},
    {value: '4+', label: '4+'},

];

const ShowButtonWrap = styled.div.attrs({
    className: 'form form__show-btn'
})`
  display: flex;
  width: inherit;
  box-sizing: border-box;
  justify-content: flex-end;

  & > .show-btn {
    margin-top: 20px;
  }
`;

const FormMainSectionWrapper = styled.div`
  height: 110px;
  display: flex;
  justify-content: space-between !important;
  align-items: center !important;

`;


export const RentForm = ({
                             AccordionFormWrapper,
                             MyTextInput,
                             MyCheckbox,
                             ShowButton,
                             FormMainSection,
                             FormAdditionalSection,
                             SelectField,
                             realEstates,
                             setRealEstates,
                             typeOfPurchase


                         }) => {

    //state for expanding
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        //customing expanding function, and making it only for the button with svg
        if (event.target.id === 'expander' || event.target.parentElement.id === 'expander' || event.target.parentElement.parentElement.id === 'expander') {

            setExpanded(isExpanded ? panel : false);
        }
    };
    return (
        <>
            <AccordionFormWrapper>
                <Formik
                    initialValues={{
                        typeOfObject: '',
                        rooms: '',

                        priceFrom: '',
                        priceTo: '',

                        squareFrom: '',
                        squareTo: '',

                        sellerPrivate: false,
                        notMatterSeller: false,

                        floorFrom: '',
                        floorTo: '',
                        floorNotFirst: false,
                        floorNotLast: false,

                        floorInHouseFrom: '',
                        floorInHouseTo: '',

                        brickBuilding: false,
                        panelBuilding: false,
                        blockBuilding: false,
                        monolithicBuilding: false,

                        balcony: false,
                        loggia: false,

                        squareKitchenFrom: '',
                        squareKitchenTo: '',
                        kitchenNotMatter: false,

                        typeOfHousingFlat: false,
                        typeOfHousingApartments: false,
                        typeOfHousingNotMatter: false

                    }}

                    onSubmit={async (values, {setSubmitting}) => {
                        console.log('values that sent to server;', JSON.stringify(values));
                        await getRealEstatesByParamsRent(values).then(res => {
                            if (res.length !== 0) {
                                setRealEstates([].concat(...res.filteredRealEstates));
                            } else {
                                console.log('Parameters of the form are too specified to find some valid entities')
                            }
                        });
                        setSubmitting(false);
                    }}
                >
                    <Form>

                        <Accordion expanded={expanded === 'expander'} onChange={handleChange('expander')}>


                            <AccordionSummary
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                expandIcon={<ExpanderButton/>}
                            >
                                <FormMainSectionWrapper>

                                    <FormMainSection className={'type-of-object'}>
                                        <Field name={'typeOfObject'} component={SelectField}
                                               options={optionsTypeOfObjects} placeholder={'Вид объекта'}/>
                                    </FormMainSection>

                                    <FormMainSection className={'rooms'}>
                                        <Field name={'rooms'} component={SelectField} options={optionsRooms}
                                               placeholder={'Комнат'}/>
                                    </FormMainSection>

                                    <FormMainSection className={'price'}>
                                        <MyTextInput
                                            label={'Цена'}
                                            name="priceFrom"
                                            placeholder={'От'}
                                        />
                                        <MyTextInput
                                            placeholder={'До'}
                                            name="priceTo"
                                        />
                                    </FormMainSection>

                                    <FormMainSection className={'form_square'}>
                                        <MyTextInput
                                            label={'Площадь'}
                                            name="squareFrom"
                                            placeholder={'От'}
                                        />
                                        <MyTextInput
                                            name="squareTo"
                                            placeholder={'До'}

                                        />
                                    </FormMainSection>
                                </FormMainSectionWrapper>
                            </AccordionSummary>

                            <AccordionDetails>
                                <FormAdditionalSection className={'type-of-seller'}>
                                    <div className="form_additional-section-name">Продавец</div>
                                    <MyCheckbox name="sellerPrivate">
                                        Частный
                                    </MyCheckbox>

                                    <MyCheckbox name="notMatterSeller">
                                        Неважно
                                    </MyCheckbox>
                                </FormAdditionalSection>

                                <FormAdditionalSection className={'floor'}>
                                    <div className="form_additional-section-name">Этаж</div>
                                    <MyTextInput
                                        name="floorFrom"
                                        placeholder={'От'}

                                    />
                                    <MyTextInput
                                        name="floorTo"
                                        placeholder={'До'}
                                    />

                                    <MyCheckbox name="floorNotFirst">
                                        Не первый
                                    </MyCheckbox>

                                    <MyCheckbox name="floorNotLast">
                                        Не последний
                                    </MyCheckbox>
                                </FormAdditionalSection>


                                <FormAdditionalSection className={'floorInHouse'}>
                                    <div className="form_additional-section-name">Этажей в доме</div>
                                    <MyTextInput
                                        name="floorInHouseFrom"
                                        placeholder={'От'}
                                    />
                                    <MyTextInput
                                        name="floorInHouseTo"
                                        placeholder={'До'}
                                    />
                                </FormAdditionalSection>

                                <FormAdditionalSection className={'type-of-building'}>
                                    <div className="form_additional-section-name">Тип дома</div>
                                    <MyCheckbox name="brickBuilding">
                                        Кирпичный
                                    </MyCheckbox>

                                    <MyCheckbox name="panelBuilding">
                                        Панельный
                                    </MyCheckbox>

                                    <MyCheckbox name="blockBuilding">
                                        Блочный
                                    </MyCheckbox>

                                    <MyCheckbox name="monolithicBuilding">
                                        Монолитный
                                    </MyCheckbox>
                                </FormAdditionalSection>

                                <FormAdditionalSection className={'balcony'}>
                                    <div className="form_additional-section-name">Балкон</div>

                                    <MyCheckbox name="balcony">
                                        Балкон
                                    </MyCheckbox>

                                    <MyCheckbox name="loggia">
                                        Лоджия
                                    </MyCheckbox>
                                </FormAdditionalSection>


                                <FormAdditionalSection className={'square-of-kitchen'}>
                                    <div className="form_additional-section-name">Площадь кухни</div>

                                    <MyTextInput
                                        name="squareKitchenFrom"
                                        placeholder='От'
                                    />
                                    <MyTextInput
                                        name="squareKitchenTo"
                                        placeholder='До'

                                    />

                                    <MyCheckbox name="kitchenNotMatter">
                                        Неважно
                                    </MyCheckbox>
                                </FormAdditionalSection>

                                <FormAdditionalSection className={'type-of-housing'}>
                                    <div className="form_additional-section-name">Тип жилья</div>
                                    <MyCheckbox name="typeOfHousingFlat">
                                        Квартира
                                    </MyCheckbox>

                                    <MyCheckbox name="typeOfHousingApartments">
                                        Апартаменты
                                    </MyCheckbox>

                                    <MyCheckbox name="typeOfHousingNotMatter">
                                        Неважно
                                    </MyCheckbox>
                                </FormAdditionalSection>
                            </AccordionDetails>

                        </Accordion>
                        <ShowButtonWrap>
                            <ShowButton type={'submit'} className={'show-btn'}>Показать</ShowButton>
                        </ShowButtonWrap>
                    </Form>
                </Formik>
            </AccordionFormWrapper>

        </>
    )

};