import React from "react";
import styled from "styled-components";

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 160px;
  width: 105px;
  background-size: cover;
  border-radius: inherit;
  background-position: center center;
  transition: opacity 0.1s linear;
  position: absolute;
`;

const Item = styled.div`
  height: 160px;
  width: 105px;
  opacity: 0;
  transition: opacity 0.1s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: 600;
  display: block;
  margin-bottom: 10px;
`;

const Year = styled.span`
  font-size: 13px;
  display: block;
`;

const Container = styled.div`
  border-radius: 10px;
  background-color: black;
  margin-right: 20px;
  &:hover {
    ${Image} {
      opacity: 0.2;
    }
    ${Item} {
      opacity: 1;
    }
  }
`;
const smallPoster = ({ poster_path, name, air_date }) => (
  <Container>
    <Image
      bgUrl={
        poster_path
          ? `https://image.tmdb.org/t/p/w300${poster_path}`
          : require("../assets/noPosterSmall.png")
      }
    />
    <Item>
      <Name>{name}</Name>
      {air_date && air_date.length > 0 && (
        <Year>{air_date.substring(0, 4)}</Year>
      )}
    </Item>
  </Container>
);

export default smallPoster;
