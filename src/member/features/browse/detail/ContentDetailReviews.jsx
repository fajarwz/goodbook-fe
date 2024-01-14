import { useState } from "react"
import ContentDetailReviewsAuth from "./ContentDetailReviewsAuth"
import ContentDetailReviewsUsers from "./ContentDetailReviewsUsers"
import ContentDetailReviewsForm from "./ContentDetailReviewsForm"

export default function ContentDetailReviews() {
    const noStarModalClosed = -1
    const [starChoosen, setStarChoosen] = useState(noStarModalClosed)

    const emptyStarFill = Array(5).fill(false)
    const [starFill, setStarFill] = useState(emptyStarFill)

    return (
        <section>
            <h2 className="mb-6">Reviews</h2>
            <ContentDetailReviewsAuth
                setStarChoosen={setStarChoosen}
                starFill={starFill}
                setStarFill={setStarFill}
            />
            <ContentDetailReviewsForm 
                starChoosen={starChoosen}
                setStarChoosen={setStarChoosen}
                setStarFill={setStarFill} 
            />
            <ContentDetailReviewsUsers />
        </section>
    )
}
