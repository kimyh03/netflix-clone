import React from "react";
import styled from "styled-components";
import Loader from "Components/Loader";
import SmallPoster from "Components/smallPoster";
import { Link, Route } from "react-router-dom";
import Companies from "../Companies/index";
import Countries from "../Countries/index";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 30px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 40px;
`;

const IMDB = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  margin-left: 20px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 17px;
  opacity: 0.8;
  line-height: 1.5;
  width: 70%;
  margin-bottom: 15px;
`;

const VideoLink = styled.div`
  font-size: 13px;
  opacity: 0.8;
  margin-bottom: 5px;
  &:hover {
    text-decoration: underline;
  }
`;

const Seasons = styled.div`
  display: flex;
  margin-top: 50px;
  top: 300px;
`;

const List = styled.ul`
  display: flex;
`;

const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 50px;
  font-size: 15px;
  &:hover {
    text-decoration: underline;
  }
`;

const DetailPresenter = ({ result, isMovie, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <>
      <Container>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : require("../../assets/noPosterSmall.png")
            }
          />
          <Data>
            <TitleContainer>
              <Title>
                {result.original_title
                  ? result.original_title
                  : result.original_name}
              </Title>
              <a
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="blank"
              >
                <IMDB bgUrl={require("../../assets/imdb-logo.png")} />
              </a>
            </TitleContainer>

            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time[0]}{" "}
                min
              </Item>
              <Divider>•</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name} / `
                  )}
              </Item>
            </ItemContainer>
            <Overview>
              {result.overview &&
              result.overview.length > 0 &&
              result.overview.length > 600
                ? `${result.overview.substring(0, 600)} . . .`
                : result.overview}
            </Overview>
            {result.videos.results &&
              result.videos.results.map((video, index) => (
                <VideoLink>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="blank"
                  >
                    {`#${index}  ${video.name}`}
                  </a>
                </VideoLink>
              ))}
            <List>
              {isMovie ? (
                <>
                  <SLink to={`/movie/${result.id}/companies`}>Companies</SLink>
                  <SLink to={`/movie/${result.id}/countries`}>Countries</SLink>
                </>
              ) : (
                <>
                  <SLink to={`/show/${result.id}/companies`}>Companies</SLink>
                  <SLink to={`/show/${result.id}/countries`}>Countries</SLink>
                </>
              )}
            </List>
            {isMovie ? (
              <>
                <Route path="/movie/:id/companies" component={Companies} />
                <Route path="/movie/:id/countries" component={Countries} />
              </>
            ) : (
              <>
                <Route path="/show/:id/companies" component={Companies} />
                <Route path="/show/:id/countries" component={Countries} />
              </>
            )}
            <Seasons>
              {!isMovie &&
                result.seasons &&
                result.seasons.length > 0 &&
                result.seasons.map((season) => (
                  <SmallPoster
                    key={season.id}
                    id={season.id}
                    poster_path={season.poster_path}
                    name={season.name}
                    air_date={season.air_date}
                  />
                ))}
            </Seasons>
          </Data>
        </Content>
      </Container>
    </>
  );

export default DetailPresenter;
