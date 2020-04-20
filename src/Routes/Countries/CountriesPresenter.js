import React from "react";
import styled from "styled-components";

const Name = styled.div`
  margin-right: 20px;
  font-size: 18px;
`;

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`;

const CountriesPresenter = ({ result, isMovie, loading, error }) =>
  loading ? null : result.production_countries &&
    result.production_countries.length > 1 ? (
    <Container>
      {result.production_countries.map((country) => (
        <Name>{country.name}</Name>
      ))}
    </Container>
  ) : (
    <Container />
  );

export default CountriesPresenter;
