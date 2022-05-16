import styled from "styled-components";
import {FormController} from "../components/FormController";
import {useEffect} from "react";
import {Card} from "../components/Card";
import {getAllEntities} from "../api/requests";

const Container = styled.div`
  margin: 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  box-sizing: border-box;

  button {
    border-radius: 100px;
    border: none;
    cursor: pointer;
  }
`;


export const MainPage = ({realEstates, setRealEstates}) => {

    useEffect(() => {
        if (!realEstates.length) {
            console.log('throwing req to back because realEstates = 0')
            getAllEntities().then(res => setRealEstates(res));
        }

    }, []);

    let counter = 0;

    return (
        <Container>
            <FormController realEstates={realEstates} setRealEstates={setRealEstates}/>

            {realEstates.length !== 0 ?
                realEstates.map((realEstate) => {

                    return <Card key={realEstate._id}
                                 id={realEstate._id}

                                 link={realEstate.link}

                                 price={realEstate.price}

                                 address={realEstate.address}

                                 rooms={realEstate.rooms}

                                 square={realEstate.square}

                                 squareKitchen={realEstate.squareKitchen}

                                 floorFlat={realEstate.floorFlat}

                                 floorHouse={realEstate.floorHouse}

                                 page={realEstate.page}

                                 typeOfPurchase={realEstate.typeOfPurchase}

                                 description={realEstate.description}

                                 typeOfObject={realEstate.typeOfObject}

                                 balcony={realEstate.balcony}

                                 loggia={realEstate.loggia}

                                 images={realEstate.images}
                    />
                }) : <div> Something went wrong</div>
            }
        </Container>
    )
}