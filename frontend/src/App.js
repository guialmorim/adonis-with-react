import React, { useState, useEffect } from "react";
import axios from "axios";

// import { Container } from './styles';

const api = axios.create({
  baseURL: "http://127.0.0.1:3333",
});

function App() {
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const { data: posts } = await api.get("/posts");
      setPosts(posts);
    }
    getPosts();
  }, []);

  async function handlePostSave(event) {
    event.preventDefault();
    const { data: post } = await api.post("/posts", {
      content: newPostContent,
    });
    setPosts([...posts, post]);
    setNewPostContent("");
  }

  async function handlePostDelete(id) {
    const { status } = await api.delete(`/posts/${id}`);
    if (status === 200) {
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
    }
  }

  return (
    <div>
      <form onSubmit={handlePostSave}>
        <textarea
          onChange={(e) => setNewPostContent(e.target.value)}
          value={newPostContent}
        ></textarea>
        <button type="submit">Postar</button>
      </form>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>{post.content}</span>
            <button type="button" onClick={() => handlePostDelete(post.id)}>
              deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
