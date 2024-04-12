import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Empty, Typography } from "antd";
import { MovieCard, MoviePoster } from "../../interfaces/MovieInterfaces";

const { Title, Paragraph } = Typography;

interface CarouselComponentProps {
  data: MovieCard[] | MoviePoster[];
  name: string;
  Component?: React.ElementType;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  name,
  data,
  Component,
}) => {
  if (!data || data.length === 0) {
    return <Empty description="Нет информации об актёрах" />;
  }
  return (
    <div>
      <Title level={2}>{name}</Title>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1.25}
        totalSlides={data.length}
        isIntrinsicHeight={true}
        visibleSlides={3}
        step={3}
        infinite={true}
      >
        <Slider>
          {data.map((element: MovieCard | MoviePoster, index: number) => (
            //
            <Slide index={index} style={{ maxWidth: "300px" }}>
              {Component ? (
                "id" in element ? (
                  <Component key={element.id} movie={element} />
                ) : (
                  <div>Нет доступа</div>
                )
              ) : "url" in element ? (
                <img
                  key={element.url}
                  src={element.url}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <div>Изображение не доступно</div>
              )}
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </div>
  );
};

export default CarouselComponent;
