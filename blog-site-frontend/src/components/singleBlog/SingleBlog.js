import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../header/Header";
import { DataLayer } from "../../DataLayer";
import "./singleBlog.css";

function SingleBlog() {
  const [blog, setblog] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user, setUser } = useContext(DataLayer);

  const { blogId } = useParams();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`/api/user/blog/${blogId}`, config)
      .then((res) => {
        setblog(res.data.blog);
        setTitle(res.data.blog.title);
        setContent(res.data.blog.content);
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/error";
      });

    return () => setUpdateMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId, setUpdateMode, user.token]);

  const editBlog = (e) => {
    e.preventDefault();
    console.log("edit called");
    setUpdateMode(true);
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/user/${user.id}/blog/${blogId}`, config);
      setUser({
        ...user,
        blogs: user.blogs.filter((id) => id !== blogId),
      });
      console.log(user.blogs.filter((id) => id !== blogId));
      window.localStorage.setItem("userData", JSON.stringify(user));
      window.location.href = "/posts";
    } catch (error) {
      console.log(error);
      window.location.href = "/error";
    }
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/user/${user.id}/blog/${blogId}`,
        { title, content },
        config
      );
      setblog(data.blog);
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="blog-edit-delete-container mt-3">
          {user.blogs.length ? (
            user.blogs.includes(blogId) ? (
              <>
                {updateMode ? ( // if update mode is on change edit button to save button
                  <button
                    className="btn btn-primary"
                    onClick={(e) => updateBlog(e)}
                  >
                    <i className="fas fa-save"></i> Save
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={(e) => editBlog(e)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                )}

                <button
                  className="btn btn-danger"
                  onClick={(e) => deleteBlog(e)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </>
            ) : null
          ) : null}
        </div>
        {blog ? (
          <>
            <div>
              <img
                src="https://cdn.hasselblad.com/hasselblad-com/6cb604081ef3086569319ddb5adcae66298a28c5_x1d-ii-sample-01-web.jpg?auto=format&q=97"
                className="card-img-top blog-img"
                alt="..."
              />
            </div>
            <div className="blog-user-details text-muted">
              <span>
                Date: {new Date(blog.dateUpdated).toLocaleDateString()}
              </span>
              <span>Author: {blog.createdBy}</span>
            </div>
            <div className="blog-title">
              <h4 className="text-muted">Title:- </h4>
              {updateMode ? (
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                <p>{blog.title}</p>
              )}
            </div>
            <div className="blog-content">
              <h5 className="text-muted">Content:-</h5>
              {updateMode ? (
                <textarea
                  value={content}
                  rows="10"
                  onChange={(e) => setContent(e.target.value)}
                />
              ) : (
                <p>{blog.content}</p>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default SingleBlog;
