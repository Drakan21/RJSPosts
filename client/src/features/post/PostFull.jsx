// --- IMPORTS --- //
import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getIsPostLoading, getPostById, removePost, selectPostById } from "../slices/posts";
import { selectUserId } from "../slices/auth";
import Process from '../../components/Process';

// --- DECLARATIONS --- //
const PostFull = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector(selectPostById);

    const loading = useSelector(getIsPostLoading);
    const user = useSelector(selectUserId);

    const handleDelete = (id) => {
        dispatch(
            removePost({ id }))
            .then(() => navigate("/", { replace: true })
            );

    };

    useEffect(() => {
        dispatch(getPostById({ id }));
    }, [])

    return (
        <main>
            <article className="post">
                {!loading && post && (
                    <>
                        <div className="postHeader">
                            <h2>{post.title}</h2>
                            <small className="postDate">
                                {format(new Date(post.date), "MMMM dd, yyyy hh:mm a")}
                                {post.edited && <em> (edited)</em>}
                            </small>
                        </div>

                        <p className="postBody">{post.body}</p>
                        <p className="postAuthor">:: <Link to={`/profile/${post.author._id}`}>{post.author.username}</Link></p>
                        {user === post.author._id && (
                            <div className="buttons">
                                <Link to={`/post/edit/${id}`}>
                                    <button className="postFormButton postEdit">edit</button>
                                </Link>
                                <button className="postDelete" onClick={() => handleDelete(post.id)}>
                                    delete
                                </button>
                            </div>
                        )}
                    </>
                )}
                {loading && !post && (
                    <Process msg="Loading post info ..." />
                )}
                {!loading && !post && (
                    <>
                        <h2>Post Not Found!</h2>
                        <p>Well, that's disappointing...</p>
                        <p>
                            <Link to="/">&lt; Return to Homepage.</Link>
                        </p>
                    </>
                )}
            </article>
        </main>
    );
}

export default PostFull;
