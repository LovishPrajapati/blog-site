import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Header from "../header/Header";
import { motion } from "framer-motion";
import { DataLayer } from "../../DataLayer";
import { useHistory } from "react-router-dom";
import "./main.css";

function Main() {
  const [blogs, setBlogs] = useState([]);

  const { user } = useContext(DataLayer);

  const history = useHistory();

  useEffect(() => {
    if (!user) history.push("/");
  }, [user, history]);

  useEffect(() => {
    axios
      .get(`/api/user/`)
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          {blogs.length
            ? blogs.map((blog) => (
                <div className="col-lg-4 col-md-6" key={blog.id}>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <div className="card mb-4">
                      <div className="user-editable">
                        <div>
                          {user.blogs.includes(blog._id) ? (
                            <div className="m-2">
                              <i
                                class="fas fa-edit user-editable-edit"
                                onClick={() => console.log("edit clicked")}
                              ></i>
                              <i
                                class="fas fa-trash user-editable-delete"
                                onClick={() => console.log("delete clicked")}
                              ></i>
                            </div>
                          ) : null}
                        </div>
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
                      <div className="card-body">
                        <div className="card-text">
                          <strong className="text-muted">Content:</strong>{" "}
                          {blog.content}
                        </div>
                      </div>
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
