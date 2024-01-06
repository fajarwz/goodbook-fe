import ContentDetailReviewsAuth from "./ContentDetailReviewsAuth"
import ContentDetailReviewsUsers from "./ContentDetailReviewsUsers"

export default function ContentDetailReviews() {
    return (
        <section>
            <h2 className="mb-6">Reviews</h2>
            <ContentDetailReviewsAuth />
            <ContentDetailReviewsUsers />
        </section>
    )
}
