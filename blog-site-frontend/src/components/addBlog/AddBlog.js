import axios from "axios";
import React, { useContext, useState } from "react";
import { DataLayer } from "../../DataLayer";
import "./addblog.css";

function AddBlog() {
  const { show, setShow, user, setUser } = useContext(DataLayer);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      if (title || content) {
        // At least one of both is required to add a blog i.e. cannot add blog with empty title and body
        const { data } = await axios.post(
          `/api/user/${user.id}/blog`,
          { title, content },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUser({ ...user, blogs: user.blogs.push(data.blog._id) }); //sync db with local storage
        window.localStorage.setItem("userData", JSON.stringify(user));
        window.location.href = "/posts";
      } else {
        alert("At least one field is required");
        setShow(false);
      }
    } catch (error) {
      console.log(error);
      window.location.href = "/error";
    }
  };
  return (
    <div>
      <div
        style={{ display: show ? "block" : "none", paddingRight: "15px" }}
        className="modal"
        id="addModal"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title" id="addModalLabel">
                {new Date().toLocaleDateString()}
              </p>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShow(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <textarea
                    className="form-control"
                    name="content"
                    rows="15"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleAddBlog(e)}
              >
                Add Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBlog;
