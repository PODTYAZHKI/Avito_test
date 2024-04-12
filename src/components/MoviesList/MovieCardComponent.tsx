import { useNavigate } from "react-router-dom";
import { MovieCard } from "../../interfaces/MovieInterfaces";

const MovieCardComponent: React.FC<{ movie: MovieCard | any }> = ({ movie }) => {
  const navigate = useNavigate();
  const moviePath = `/movies/${movie.id}`;
  return (
    <div
      style={{ position: "relative", borderRadius: "4px", cursor: "pointer" }}
      onClick={() => {
        navigate(moviePath);
      }}
      onMouseOver={(e) =>
        (e.currentTarget.style.boxShadow = "0px 8px 15px rgba(0, 0, 0, 0.3)")
      }
      onMouseOut={(e) =>
        (e.currentTarget.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.15)")
      }
    >
      <img
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "5px",

          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
        }}
        alt={movie.name}
        src={movie.poster.url ? movie.poster.url : movie.backdrop.previewUrl}
      />
      <div
        style={{
          position: "absolute",
          bottom: "0",
          width: "100%",
          textAlign: "center",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "5px 0",
          borderRadius: "0 0 5px 5px",
        }}
      >
        {movie.name}
        {movie.rating && (
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              style={{
                color: "white",
              }}
            >
              IMDb: {movie.rating.imdb}
            </div>

            <div
              style={{
                color: "white",
              }}
            >
              KP: {movie.rating.kp}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          top: "5px",
          left: "5px",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.75)",
          padding: "2px 5px",
          borderRadius: "4px",
        }}
      >
        {movie.year}
      </div>
    </div>
  );
};

export default MovieCardComponent;
