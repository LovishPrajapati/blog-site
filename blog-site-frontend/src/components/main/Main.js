import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../header/Header";
import { motion } from "framer-motion";
import { DataLayer } from "../../DataLayer";
import { useHistory } from "react-router-dom";
import AddBlog from "../addBlog/AddBlog";
import "./main.css";

function Main() {
  const [blogs, setBlogs] = useState([]);
  const { user, show, setShow } = useContext(DataLayer);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/api/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });

    return () => {
      setBlogs([]);
    };
  }, [user.token, history]);

  const toogleForm = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const handleBlogClick = (e, blog) => {
    e.preventDefault();
    history.push(`/blog/${blog._id}`);
  };

  return (
    <>
      <AddBlog show={show} />
      <Header />
      <div className="container mt-4">
        <div className="add-blog-button mb-2 ">
          <button className="btn btn-success" onClick={(e) => toogleForm(e)}>
            Add Blog
          </button>
        </div>
        <div className="row">
          {blogs.length
            ? blogs.map((blog) => (
                <div
                  className="col-lg-4 col-md-6"
                  key={blog._id}
                  onClick={(e) => handleBlogClick(e, blog)}
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <div className="card mb-4 main">
                      <div className="user-editable">
                        <div>
                          <span className="blog-modify-date text-muted">
                            Modified on:{" "}
                            {new Date(blog.dateUpdated).toLocaleDateString()}
                          </span>
                          <span className="blog-owner text-muted">
                            By: {blog.createdBy}
                          </span>
                        </div>
                      </div>
                      {/* <img
                      src="https://cdn.hasselblad.com/hasselblad-com/6cb604081ef3086569319ddb5adcae66298a28c5_x1d-ii-sample-01-web.jpg?auto=format&q=97"
                      className="card-img-top"
                      alt="..."
                    /> */}
                      <div className="card-header">
                        <div className="card-title ">
                          {" "}
                          <strong className="text-muted">Title:</strong>{" "}
                          {blog.title}
                        </div>
                      </div>
                      {/* <div className="card-body">
                        <div className="card-text">
                          <strong className="text-muted">Content:</strong>{" "}
                          {blog.content}
                        </div>
                      </div> */}
                    </div>
                  </motion.div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}

export default Main;
