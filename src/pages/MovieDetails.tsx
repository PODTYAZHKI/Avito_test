import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "antd";

import MovieCardComponent from "../components/MoviesList/MovieCardComponent";
import CarouselComponent from "../components/MovieDetails.tsx/CarouselComponent";
import SeasonsComponent from "../components/MovieDetails.tsx/SeasonsComponent";
import ReviewComponent from "../components/MovieDetails.tsx/ReviewComponent";

import {
  getMovieById,
  getPostersById,
  getReviewById,
  getSeasonsById,
} from "../api/MovieDetailsAPI";

import {
  Movie,
  MoviePerson,
  MovieReview,
  Season,
} from "../interfaces/MovieInterfaces";

import { List, Avatar, Typography, Empty } from "antd";

const { Title, Paragraph } = Typography;

const MovieDetails: React.FC = () => {
  const [movie, setMovie] = useState<Movie>();
  const [posters, setPosters] = useState();
  const [seasons, setSeasons] = useState<Season[]>();
  const [visibleCount, setVisibleCount] = useState(10);

  const [reviews, setReviews] = useState<MovieReview[]>();

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const fetchData = async () => {
    await getMovieById(Number(id)).then(async (res) => {
      let data = res.data;
      data.poster = res.data.poster.url;
      data.persons = res.data.persons.filter(
        (person: MoviePerson) => person.profession === "актеры"
      );

      setMovie(res.data);
      if (data.type === "tv-series") {
        const seasonsResponse = await getSeasonsById(Number(id));
        const sortedData = seasonsResponse.data.docs.sort(
          (a: Season, b: Season) => a.number - b.number
        );
        setSeasons(sortedData);
        console.log("seasons", seasons);
      }
    });

    await getPostersById(Number(id)).then((res) => {
      setPosters(res.data.docs);
      console.log("Posters", res.data.docs);
    });
    await getReviewById(Number(id)).then((res) => {
      setReviews(res.data.docs);
      console.log("Reviews", res.data.docs);
    });
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  if (!movie) {
    return <div>Загрузка информации о фильме...</div>;
  }

  const renderActors = (actors: MoviePerson[]) => {
    if (!actors || actors.length === 0) {
      return <Empty description="Нет информации об актёрах" />;
    }

    const showMoreActors = () => {
      setVisibleCount((prevCount) => prevCount + 10);
    };

    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={actors.slice(0, visibleCount)}
          renderItem={(actor) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={actor.photo} />}
                title={actor.name}
                description={actor.description}
              />
            </List.Item>
          )}
        />
        {visibleCount < actors.length && (
          <Button
            onClick={showMoreActors}
            style={{ marginTop: 16, marginBottom: 16 }}
          >
            Показать больше
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Button onClick={() => navigate(-1)} style={{ marginBottom: "5px" }}>
        Назад
      </Button>

      <Row align="stretch" gutter={10}>
        <Col xs={24} sm={24} md={6} lg={6} xl={6} style={{ height: "100%" }}>
          <img
            src={movie.poster}
            alt={movie.name}
            style={{
              width: "100%",

              objectFit: "cover",
            }}
          />
        </Col>
        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
          <Title>{movie.name}</Title>
          <Paragraph style={{ textAlign: "justify" }}>
            {movie.description}
          </Paragraph>
          <div>KP: {movie.rating.kp || ""}</div>
          <div>IMdb: {movie.rating.imdb || ""}</div>
        </Col>
      </Row>

      <Title level={2}>Актёры</Title>
      {renderActors(movie.persons)}

      {seasons && (
        <>
          <Title level={2}>Сезоны</Title>
          {<SeasonsComponent seasons={seasons} />}
        </>
      )}

      {reviews && (
        <CarouselComponent
          name="Отзывы"
          data={reviews}
          renderSlide={(review) => (
            <ReviewComponent key={review.id} review={review} />
          )}
        />
      )}
      <CarouselComponent
        name="Похожее"
        data={movie.similarMovies}
        // Component={MovieCardComponent}
        renderSlide={(movie) => (
          <MovieCardComponent key={movie.id} movie={movie} />
        )}
      />
      {posters && <CarouselComponent name="Постеры" data={posters} />}
    </>
  );
};

export default MovieDetails;
