// import Swiper core and required modules
import {A11y, Navigation, Pagination, Zoom} from 'swiper';
import {Link} from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react';
import styled from "styled-components";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {CardLine} from "./utils/CardLine";
import {OrangeInfo} from "./utils/OrangeInfo";
import {fromEngToRus} from "../utils/converter";


const CardWrapper = styled.div`
  width: 1300px;
  height: 320px;
  margin-top: 50px;
  margin-left: 70px;
  display: flex;
  background: #E7F2FF;
  border-radius: 20px;
  box-sizing: border-box;
`;
const SwiperWrap = styled.div`
  height: 320px;
  width: 366px;

`;


export const CardImageMain = styled.img`
  display: block;
  height: 320px;
  width: 366px;
  border-radius: 20px 0 0 20px;
`;

const Examples = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 128px;
  height: 320px;
  margin-left: 7px;
`;

const CardImgEx = styled.img`
  width: 128px;
  height: 102px;

`;

const CardInfo = styled.div`
  margin: 25px 30px;

`;

const CardHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const CardHeadTitleDescr = styled.div`
  margin-right: 300px;


`;

const CardHeadTitlePrice = styled.div`

`;


const CardBody = styled.div`


`;


const CardBodyFloorHouse = styled.div`
  margin-top: 30px;

`;

const CardBodyAddress = styled.div`
  margin-top: 20px;

`;

const ButtonShow = styled.button`
  margin-left: 543px;
  width: 170px;
  height: 50px;
  background: #4CACE3;
  border-radius: 100px;
  border: inherit;
  color: #FFFFFF;
`;


export const Card = (
    props
) => {
    const {
        id,

        key,

        link,

        price,

        address,

        rooms,

        square,

        floorFlat,

        floorHouse,

        page,

        typeOfPurchase,

        description,

        typeOfObject,

        balcony,

        loggia,

        images,
    } = props;

    return (
        <CardWrapper>
            <SwiperWrap>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination, A11y, Zoom]}
                    spaceBetween={10}
                    slidesPerView={1}
                    zoom={true}
                    loop={true}
                    navigation
                    pagination={{clickable: true}}
                >

                    <SwiperSlide zoom={false}> <CardImageMain src={images[0]}
                                                              alt={'photo_1'}/></SwiperSlide>
                    <SwiperSlide> <CardImageMain src={images[1]} alt={'photo_2'}/></SwiperSlide>
                    <SwiperSlide> <CardImageMain src={images[2]} alt={'photo_3'}/></SwiperSlide>
                    <SwiperSlide> <CardImageMain src={images[3]} alt={'photo_4'}/></SwiperSlide>
                </Swiper>
            </SwiperWrap>

            <Examples>
                <CardImgEx src={images[1]} alt={'photo_2'}/>
                <CardImgEx src={images[2]} alt={'photo_2'}/>
                <CardImgEx src={images[3]} alt={'photo_3'}/>
            </Examples>

            <CardInfo>
                <CardHead>
                    <CardHeadTitleDescr>
                        <span className={'rooms'}>{rooms}</span>-Комнатная квартира, {square}м<sup>2</sup>
                    </CardHeadTitleDescr>

                    <CardHeadTitlePrice>
                        <strong>{price}₽ {typeOfPurchase === 'rent' ? price <5000 ? '/сутки' : '/месяц' : ''}</strong>
                    </CardHeadTitlePrice>
                </CardHead>
                <CardLine/>

                <CardBody>
                    {typeOfObject !== 'non-valid' ? <OrangeInfo>Тип дома: {fromEngToRus(typeOfObject)}</OrangeInfo>
                        : <div/>}


                    <CardBodyFloorHouse>
                        <span>{floorFlat}</span>/<span>{floorHouse}</span> этаж
                    </CardBodyFloorHouse>
                    {address.street}, {address.numberOfHouse}
                    <CardBodyAddress>
                    </CardBodyAddress>
                </CardBody>

                <Link to={`/avito/${id}`} state={props}>
                    <ButtonShow>
                        Показать
                    </ButtonShow>
                </Link>
            </CardInfo>
        </CardWrapper>
    )
}