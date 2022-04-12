import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../slices/posts";
import { selectUsername } from "../slices/auth";

function NewPost() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const author = useSelector(selectUsername);

    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");

    const handleTitleChange = (e) => setPostTitle(e.target.value);
    const handleBodyChange = (e) => setPostBody(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addPost({ title: postTitle, body: postBody, author }))
            .then(() => navigate('/', { replace: true }));
    };

    const handleFormCancel = async () => {
        navigate("/");
    };

    useEffect(() => {
        setPostTitle("");
        setPostBody("");
    }, [])

    return (
        <main className="newPost">
            {!author && <Navigate to="/login" state={{ from: location }} />}
            {author && (
                <>
                    <h2>New Post</h2>
                    <form className="newPostForm" onSubmit={handleSubmit}>
                        <br />
                        <label className="postFormLabel" htmlFor="postTitle">
                            Title:
                        </label>
                        <input
                            className="postFormInput"
                            type="text"
                            id="postTitle"
                            placeholder="title"
                            value={postTitle}
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
                            value={postBody}
                            onChange={handleBodyChange}
                            placeholder="enter a message ..."
                            required
                        />
                        <div className="postFormButtons">
                            <button
                                type="reset"
                                className="postFormButton"
                                onClick={handleFormCancel}
                            >
                                cancel
                            </button>
                            <button type="submit" className="postFormButton postFormSubmit">
                                submit
                            </button>
                        </div>
                    </form>
                </>
            )}
        </main>
    );
}

export default NewPost;
