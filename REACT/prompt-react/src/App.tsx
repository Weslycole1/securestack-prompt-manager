import { useState } from "react";
import PromptCard from "./promptCard";
import "./App.css";

function App() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    const newPrompt = {
      id: Date.now(),
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    setPrompts([...prompts, newPrompt]);

    setTitle("");
    setContent("");
    setTags("");
  }

  function handleDelete(id: number) {
    const updated = prompts.filter((p) => p.id !== id);
    setPrompts(updated);
  }

  const allTags = [...new Set(prompts.flatMap((p) => p.tags))];

  const filteredPrompts = prompts.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (activeTag === "" || p.tags.includes(activeTag))
    );
  });

  return (
    <div className="app">
      <h1>Prompt Manager</h1>

      <form className="prompt-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Prompt title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Prompt content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <button type="submit">Add Prompt</button>
      </form>

      <input
        className="search"
        type="text"
        placeholder="Search prompts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="tag-bar">
        <button onClick={() => setActiveTag("")}>All</button>
        {allTags.map((tag, i) => (
          <button key={i} onClick={() => setActiveTag(tag)}>
            {tag}
          </button>
        ))}
      </div>

      <div className="prompt-grid">
        {filteredPrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onDelete={() => handleDelete(prompt.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;