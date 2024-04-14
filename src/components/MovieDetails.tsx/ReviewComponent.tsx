import { Card, Avatar } from "antd";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import { MovieReview } from "../../interfaces/MovieInterfaces";

interface ReviewCardProps {
  review: MovieReview;
}

const ReviewComponent: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div style={{ padding: 20 }}>
      <Card
        key={review.id}
        style={{ marginTop: 16, maxHeight: "500px", overflowY: "auto" }}
      >
        <Meta
          avatar={
            <Avatar src={`https://i.pravatar.cc/150?u=${review.authorId}`} />
          }
          title={review.title}
          description={
            <>
              <p>{`${review.author} оценил ${review.userRating}/10`}</p>
              <p>{moment(review.createdAt).format("LL")}</p>
              <p>{review.review}</p>
            </>
          }
        />
      </Card>
    </div>
  );
};

export default ReviewComponent;
