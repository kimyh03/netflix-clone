import React from "react";
import styled from "styled-components";

const Logo = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  width: 60px;
  height: 100px;
`;

const Name = styled.div``;

const Company = styled.div`
  margin-right: 10px;
`;

const Container = styled.div`
  display: flex;
`;

const CompaniesPresenter = ({ result, isMovie, loading, error }) =>
  loading ? null : (
    <Container>
      {result.production_companies.map((company) => (
        <Company>
          <Logo
            bgUrl={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
          />
          <Name>{company.name}</Name>
        </Company>
      ))}
    </Container>
  );

export default CompaniesPresenter;
