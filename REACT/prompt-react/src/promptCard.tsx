import { useState } from "react";

function PromptCard({ prompt, onDelete }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="prompt-card">
        <h3>{prompt.title}</h3>

        <p>{prompt.content.slice(0, 80)}...</p>

        <div className="tags">
          {prompt.tags.map((tag: string, index: number) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="card-buttons">
          <button onClick={() => setOpen(true)}>View</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>

      {open && (
        <div className="modal">
          <div className="modal-content">
            <h2>{prompt.title}</h2>
            <p>{prompt.content}</p>

            <div className="tags">
              {prompt.tags.map((tag: string, i: number) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>

            <button onClick={() => setOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PromptCard;