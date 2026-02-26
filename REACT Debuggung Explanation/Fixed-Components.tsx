import { useState, useEffect } from "react";

type Prompt = {
  id: number;
  title: string;
};

type Props = {
  userId: string;
};

function PromptList({ userId }: Props) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    fetch(`/api/prompts?user=${userId}`)
      .then((res) => res.json())
      .then((data: Prompt[]) => {
        setPrompts(data);
      });
  }, [userId]);

  function handleDelete(id: number) {
    const updated = prompts.filter((p) => p.id !== id);
    setPrompts(updated);
  }

  return (
    <ul>
      {prompts.map((prompt) => (
        <li key={prompt.id}>
          <span>{prompt.title}</span>
          <button onClick={() => handleDelete(prompt.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default PromptList;