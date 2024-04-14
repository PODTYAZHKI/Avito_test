import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Empty, Typography } from "antd";
import { MovieCard, MoviePoster, MovieReview } from "../../interfaces/MovieInterfaces";

const { Title, Paragraph } = Typography;

interface CarouselComponentProps {
  data: MovieCard[] | MoviePoster[] | MovieReview[];
  name: string;
  renderSlide?: (item: any) => React.ReactNode;
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({
  name,
  data,
  renderSlide
}) => {
  if (!data || data.length === 0) {
    return <Empty description={`Нет информации ${isMovieReviewArray(data) ? 'об отзывах' : isMoviePosterArray(data) ? 'о постерах' : 'о похожих фильмах'}`} />;
  }
  return (
    <div style={{ maxWidth: '90vw', overflow: 'hidden' }}>
      <Title level={2}>{name}</Title>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1.25}
        totalSlides={data.length}
        isIntrinsicHeight={true}
        visibleSlides={isMovieReviewArray(data) ? 1 : 3}
        step={isMovieReviewArray(data) ? 1 : 3}
        infinite={true}
        
      >
        <Slider >
          {data.map((element: MovieCard | MoviePoster | MovieReview, index: number) => (
            //
            <Slide index={index} style={{ }}>

              {renderSlide ? renderSlide(element) :
               "url" in element ? (
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


function isMovieReviewArray(data: any[]): data is MovieReview[] {
  return data.every(element => (
    element.hasOwnProperty('review') &&
    typeof element.review === 'string' &&
    typeof element.author === 'string'
  ));
}
function isMoviePosterArray(data: any[]): data is MoviePoster[] {
  return data.every(element => (
    element.hasOwnProperty('url') &&
    typeof element.url === 'string'
  ));
}