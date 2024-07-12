import React, { useContext, useState } from "react";
import "./comments.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { AuthContext } from "../../context/authContext";

const Comments = ({ tripId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["comments", tripId],
    queryFn: () => makeRequest.get(`/comments?tripId=${tripId}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (newComment) => makeRequest.post("/comments", newComment),
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
    onError: (error) => {
      console.error("Error creating comment:", error);
    },
  });

  const deleteComment = async (commentId) => {
    try {
      await makeRequest.delete(`/comments/${commentId}`);
      queryClient.invalidateQueries("comments");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!desc.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    if (!currentUser?.id) {
      console.error("User ID not found");
      return;
    }
    mutation.mutate({ desc, tripId, userId: currentUser.id });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <input
          type="text"
          placeholder="Write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {isLoading ? (
        "Loading..."
      ) : error ? (
        <div className="error">
          <p>Error loading comments:</p>
          <pre>{error.message}</pre>
        </div>
      ) : (
        data && Array.isArray(data) && data.length > 0 ? (
          data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={comment.profilePic || "/defaultProfilePic.jpg"} alt="Profile" />
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.desc}</p>
              </div>
              <div className="comment-actions">
                {(currentUser?.role === 'admin' || currentUser?.id === comment.userId) && (
                  <button className="delete-btn" onClick={() => deleteComment(comment.id)}>Delete</button>
                )}
                <span className="date">{moment(comment.createdAt).fromNow()}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet</p>
        )
      )}
    </div>
  );
};

export default Comments;
