import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import MovieCardComponent from "../components/MoviesList/MovieCardComponent";
import MovieSearch from "../components/MoviesList/MovieSearch";
import FilterField from "../components/MoviesList/FilterField";
import CountriesFilterField from "../components/MoviesList/CountriesFilterField";

import { getMovieByName } from "../api/MoviesListAPI";

import { MovieCard, QueryParams } from "../interfaces/MovieInterfaces";

import { Row, Col, Pagination, Spin, Button } from "antd";

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<MovieCard[]>();
  const [filteredMovies, setFilteredMovies] = useState<MovieCard[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  let [searchParams, setSearchParams] = useSearchParams();
  const [year, setYear] = useState<number[]>();
  const [country, setCountry] = useState<string[]>();
  const [rating, setRating] = useState<number[]>();

  const updateQueryParams = (params: QueryParams) => {
    let newSearchParams = new URLSearchParams(searchParams);

    for (const key in params) {
      newSearchParams.set(key, params[key]);
    }

    setSearchParams(newSearchParams);
  };

  const handleSearch = async (movie: string) => {
    try {
      updateQueryParams({
        searchTerm: movie,
        currentPage: "1",
        pageSize: "10",
      });
      setCurrentPage(1);
      setPageSize(10);
      setSearchTerm(movie);
    } catch {
      console.log("Ошибка");
    }
  };
  const handlePageChange = async (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const initializeStateFromQueryParams = useCallback(() => {
    const queryParams = Object.fromEntries(searchParams.entries());
    console.log(queryParams);

    let updatedSearchTerm = queryParams.searchTerm || "";
    let updatedCurrentPage = Number(queryParams.currentPage) || 1;
    let updatedPageSize = Number(queryParams.pageSize) || 10;

    setCurrentPage(updatedCurrentPage);
    setPageSize(updatedPageSize);

    if (updatedSearchTerm) {
      setSearchTerm(updatedSearchTerm);
    }
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      await getMovieByName(currentPage, pageSize, searchTerm).then((res) => {
        setMovies(res.data.docs);
        setFilteredMovies(res.data.docs);
        setTotalCount(res.data.total);
        console.log(res.data.docs);
        updateQueryParams({
          searchTerm: searchTerm,
          currentPage: String(currentPage),
          pageSize: String(pageSize),
        });
      });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, [currentPage, pageSize, searchTerm]);

  useEffect(() => {
    initializeStateFromQueryParams();
  }, [initializeStateFromQueryParams]);

  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, pageSize, fetchData]);
  const resetFilters = () => {
    setYear(undefined)
    setRating(undefined)
    setCountry(undefined)
    setFilteredMovies(movies)
  }
  const filterData = () => {
    let data = movies?.filter((movie: MovieCard) => {
      let matchesYear = true;
      if (year) {
        if (year.length === 1) {
          matchesYear = movie.year === year[0];
        } else if (year.length === 2) {
          matchesYear = movie.year >= year[0] && movie.year <= year[1];
        }
      }

      let matchesRating = true;
      if (rating) {
        if (rating.length === 1) {
          matchesYear = movie.ageRating === rating[0];
        } else if (rating.length === 2) {
          matchesRating =
            movie.ageRating >= rating[0] && movie.ageRating <= rating[1];
        }
      }

      const matchesCountry =
        !country ||
        country.some((c) =>
          movie.countries.map((country) => country.name).includes(c)
        );

      return matchesYear && matchesCountry && matchesRating;
    });

    setFilteredMovies(data);
    console.log("filterData", data);
  };

  useEffect(() => {
    filterData();
  }, [year, country, rating]);

  const handleYearChange = (value: number[] | undefined) => {
    setYear(value);
    console.log(value);
  };

  const handleCountryChange = (value: string[]) => {
    console.log("countrie", value);
    setCountry(value);
  };

  const handleRatingChange = (value: number[] | undefined) => {
    setRating(value);
  };

  return (
    <>
      <Row>
        <Col span={24} style={{ marginBottom: "10px" }}>
          <MovieSearch handleSearch={handleSearch} />
          {movies && (
            <>
              <CountriesFilterField change={handleCountryChange} />
              <FilterField change={handleYearChange} value="year" />
              <FilterField change={handleRatingChange} value="rating" />
              <Button type="primary" onClick={resetFilters}>
                Сбросить фильтры
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Spin spinning={loading} size="large">
        {movies && (
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32, xxl: 40 },
              { xs: 8, sm: 16, md: 24, lg: 32, xxl: 40 },
            ]}
            justify="start"
          >
            {filteredMovies &&
              filteredMovies.map((movie: MovieCard) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={4}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <MovieCardComponent key={movie.id} movie={movie} />
                </Col>
              ))}
          </Row>
        )}
        {filteredMovies && (
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalCount}
            onChange={handlePageChange}
            showSizeChanger={true}
            style={{
              marginTop: "15px",
              display: "flex",
              justifyContent: "center",
            }}
          />
        )}
      </Spin>
    </>
  );
};

export default MoviesList;
