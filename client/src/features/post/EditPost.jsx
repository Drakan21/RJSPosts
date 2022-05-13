// --- IMPORTS --- //
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { selectUserId } from "../slices/auth";
import { selectPostById, updatePost } from "../slices/posts";

// --- DECLARATIONS --- //
const EditPost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const post = useSelector(selectPostById);
    const author = useSelector(selectUserId);

    const [title, setTitle] = useState(post?.title || "");
    const [body, setBody] = useState(post?.body || "");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleBodyChange = (e) => setBody(e.target.value);

    const handleEdit = (id) => {
        dispatch(updatePost({ id, title: title.trim(), body: body.trim(), author })).then(() => {
            navigate(`/post/${id}`, { replace: true });
        });
    };

    const handleEditCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        setTitle(post.title);
        setBody(post.body);
    }, [post, setTitle, setBody]);

    return (
        <main className="newPost">
            {!author && <Navigate to="/login" state={{ from: location }} />}
            {author && (
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <br />
                        <label className="postFormLabel" htmlFor="postTitle">
                            Title:
                        </label>
                        <input
                            className="postFormInput"
                            type="text"
                            id="postTitle"
                            placeholder="title"
                            value={title}
                            required
                            onChange={handleTitleChange}
                        ></input>
                        <br />
                        <label className="postFormLabel" htmlFor="postBody">
                            Post:
                        </label>
                        <textarea
                            className="postFormTextArea"
                            id="postBody"
                            value={body}
                            onChange={handleBodyChange}
                            placeholder="enter a message ..."
                            required
                        />
                        <div className="postFormButtons">
                            <button
                                type="reset"
                                className="postFormButton"
                                onClick={handleEditCancel}
                            >
                                cancel
                            </button>
                            <button
                                type="button"
                                className="postFormButton postFormSubmit"
                                onClick={() => handleEdit(post.id)}
                                disabled={!title || !body}
                            >
                                update
                            </button>
                        </div>
                    </form>
                </>
            )}
        </main>
    );
}

export default EditPost;
