import React, { useEffect, useState } from "react";
import axios from "axios";

function Main() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {blogs.length
          ? blogs.map((blog) => (
              <div className="col-lg-4 col-md-6">
                <div className="card mb-4">
                  <img
                    src="https://cdn.hasselblad.com/hasselblad-com/6cb604081ef3086569319ddb5adcae66298a28c5_x1d-ii-sample-01-web.jpg?auto=format&q=97"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-header">
                    <div className="card-title">{blog.title}</div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{blog.body}</p>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default Main;
