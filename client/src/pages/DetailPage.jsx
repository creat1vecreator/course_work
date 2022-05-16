import React from 'react';
import styled from 'styled-components';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Link, useLocation} from 'react-router-dom'
import {Swiper, SwiperSlide} from "swiper/react";
import {A11y, Navigation, Pagination, Zoom} from "swiper";
import {OrangeInfo} from "../components/utils/OrangeInfo";
import {fromEngToRus} from "../utils/converter";
import {CardLine} from "../components/utils/CardLine";

const DetailPageContainer = styled.div`
  margin: 30px 80px;
`;

export const CardImageMain1 = styled.img`
  display: block;
  height: 420px;
  width: 486px;
  border-radius: 20px 0 0 20px;
`;

const ButtonBack = styled.button`
  border: none;
  background: white;
  cursor: pointer;
  margin-bottom: 20px;


`;

const ExamplesDetailPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: auto;
  margin-left: 7px;
`;


const SwiperWrapDetails = styled.div`
  height: 310px;
  width: 466px;
  border-radius: 20px 0 0 20px;
`;

const PhotoSection = styled.div`
  display: flex;
`;

const CardImgExDetailPage = styled.img`
  width: 128px;
  height: 126px;
  margin: 3px auto;

  &:first-child {
    border-radius: 0 20px 0 0;
    margin-top: 0 !important;

  }

  &:last-child {
    border-radius: 0 0 20px 0;
  }
`;


const CommonInfo = styled.div`
  margin-left: 48px;

`;

const Price = styled.div`
`;

const CommonInfoHeader = styled.div`

`;

const PhotosAndCommon = styled.div`
  display: flex;
`;

const CardBodyFloorHouse = styled.div`
  margin-top: 30px;

`;

const CardBodyAddress = styled.div`
  margin-top: 10px;

`;

const Description = styled.div`
  margin-top: 50px;

`;
const DescriptionHead = styled.div`

`;

const DescriptionInfo = styled.div`

`;

const DetailInfo = styled.div`
  margin-top: 35px;
  width: 601px;

`;


const DetailMainWrap = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const DetailValuesMain = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 3px;
`;

const DetailValuesNames = styled.div`
  display: flex;
  align-items: center;
  width: 150px;

`;

const DetailValuesKeys = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    margin: 0;
  }
`;
const DetailAdditional = styled.div`
  display: flex;

  & > div:first-child {
    margin-left: 70px;
    margin-right: 10px;
  }
`;


export const DetailPage = (apartments = true) => {
    const location = useLocation();
    const {
        key,

        link,

        price,

        address,

        rooms,

        square,

        squareKitchen,

        floorFlat,

        floorHouse,

        page,

        typeOfPurchase,

        description,

        typeOfObject,

        balcony,

        loggia,

        images,

        kitchenSquare = 10,

    } = location.state;
    console.log('balcony:', balcony);

    return (

        <DetailPageContainer>
            <Link to={'/'}>
                <ButtonBack>
                    <ArrowBackIcon sx={
                        {
                            color: '#4CACE3',
                            fontSize: '46px'
                        }
                    }/>
                </ButtonBack>
            </Link>
            <PhotosAndCommon>
                <PhotoSection>
                    <SwiperWrapDetails>
                        <Swiper
                            // install Swiper modules
                            modules={[Navigation, Pagination, A11y, Zoom]}
                            spaceBetween={10}
                            slidesPerView={1}
                            zoom={true}
                            loop={true}
                            navigation
                            pagination={{clickable: true}}
                            onSwiper={(swiper) => console.log(swiper)}
                            onSlideChange={() => console.log('slide change')}
                        >

                            <SwiperSlide zoom={false}> <CardImageMain1 src={images[0]}
                                                                       alt={'photo_1'}/></SwiperSlide>

                            {images.length !== 0 ? images.map(imgSrc => {
                                return <SwiperSlide> <CardImageMain1 src={imgSrc}
                                                                     alt={'photo_2'}/></SwiperSlide>


                            }) : <div/>}

                        </Swiper>

                    </SwiperWrapDetails>
                    <ExamplesDetailPage>
                        <CardImgExDetailPage src={images[1]} alt={'photo_2'}/>
                        <CardImgExDetailPage src={images[2]} alt={'photo_2'}/>
                        <CardImgExDetailPage src={images[3]} alt={'photo_3'}/>
                    </ExamplesDetailPage>
                </PhotoSection>

                <CommonInfo>

                    <CommonInfoHeader>
                        {rooms}-комнатная квартира, {square} м<sup>2</sup>
                    </CommonInfoHeader>
                    <CardLine/>

                    <Price>
                        <strong>{price}₽ {typeOfPurchase === 'rent' ? price < 5000 ? '/сутки' : '/месяц' : ''}</strong>
                    </Price>

                    <CardBodyFloorHouse>
                        <span>{floorFlat}</span>/<span>{floorHouse}</span> этаж
                    </CardBodyFloorHouse>

                    <CardBodyAddress>
                        {address.street}
                    </CardBodyAddress>

                    <Description>
                        <DescriptionHead>
                            <strong>Описание</strong>
                        </DescriptionHead>
                        <DescriptionInfo>
                            {description}
                        </DescriptionInfo>
                    </Description>
                </CommonInfo>
            </PhotosAndCommon>

            <DetailInfo>
                <DetailMainWrap>
                    {!!square
                        ?
                        <DetailValuesMain>
                            <DetailValuesNames>Общая
                                площадь:</DetailValuesNames><DetailValuesKeys><OrangeInfo>{square} м<sup>2</sup></OrangeInfo></DetailValuesKeys>
                        </DetailValuesMain>
                        :
                        <div/>}


                    {!!squareKitchen
                        ?
                        <DetailValuesMain>

                            <DetailValuesNames>Площадь
                                кухни:</DetailValuesNames><DetailValuesKeys><OrangeInfo>{squareKitchen} м<sup>2</sup></OrangeInfo></DetailValuesKeys>
                        </DetailValuesMain>
                        :
                        <div/>}
                    {balcony
                        ?
                        loggia
                            ?
                            <DetailValuesMain>
                                <DetailValuesNames>Балкон/лоджия: </DetailValuesNames>
                                <DetailValuesKeys>
                                    <OrangeInfo>Балкон</OrangeInfo>
                                    <OrangeInfo>Лоджия</OrangeInfo>
                                </DetailValuesKeys>
                            </DetailValuesMain>
                            :
                            <DetailValuesMain>
                                <DetailValuesNames>Балкон/лоджия:</DetailValuesNames> <DetailValuesKeys><OrangeInfo>Балкон</OrangeInfo></DetailValuesKeys>
                            </DetailValuesMain>
                        :
                        loggia
                            ?
                            <DetailValuesMain>
                                <DetailValuesNames>Балкон/лоджия: </DetailValuesNames><DetailValuesKeys><OrangeInfo>Лоджия</OrangeInfo></DetailValuesKeys>
                            </DetailValuesMain>
                            : <div/>
                    }
                    {!!floorFlat
                        ?
                        <DetailValuesMain>
                            <DetailValuesNames>Этаж: </DetailValuesNames>
                            <DetailValuesKeys><OrangeInfo>{floorFlat}</OrangeInfo></DetailValuesKeys>
                        </DetailValuesMain>

                        :
                        <div/>}


                    {!!floorHouse
                        ?
                        <DetailValuesMain>
                            <DetailValuesNames>Этажей в доме:</DetailValuesNames>
                            <DetailValuesKeys><OrangeInfo>{floorHouse}</OrangeInfo></DetailValuesKeys>
                        </DetailValuesMain>
                        :
                        <div/>}


                </DetailMainWrap>

                <DetailAdditional>
                    {typeOfObject !== 'non-valid' ?
                        <OrangeInfo>Тип дома: {fromEngToRus(typeOfObject)}</OrangeInfo>
                        : <div/>}
                    {apartments ? <OrangeInfo>Апартаменты</OrangeInfo> : ''}
                </DetailAdditional>
            </DetailInfo>

        </DetailPageContainer>
    )
}


