3A      



bug 1;    Missing dependency in useEffect

The useEffect hook uses the userId value when fetching prompts, but userId was not included in the dependency array. This means the effect would only run once when the component mounts and would not run again if the userId changes.

Fix:
userId was added to the dependency array so that the effect runs again whenever the user changes and the correct prompts are fetched.

bug 2;    Direct mutation of React state


Inside the handleDelete function, the code attempted to update state by directly assigning a new value to prompts using prompts = updated. In React, state should never be modified directly because it will not trigger a re-render.

Fix:
The code was updated to use the setPrompts state setter function (setPrompts(updated)), which properly updates the state and triggers a re-render.


bug 3;      Incorrect onClick event handler


The onClick handler for the delete button was written as onClick={handleDelete(prompt.id)}. This causes the function to execute immediately during rendering instead of when the button is clicked.

Fix:
The function call was wrapped in an arrow function: onClick={() => handleDelete(prompt.id)}. This ensures that the delete function only runs when the user clicks the button.





3B


Performance Investigation

If users report that the Prompt Manager feels slow when loading more than 200 prompts, I would first investigate where the slowdown occurs. I would use the browser’s Developer Tools and the React Developer Tools Profiler to analyze component rendering and check for unnecessary re-renders.

Rendering a large list of prompts at once can significantly impact performance because the browser must create and update many DOM elements. To address this, I would consider implementing list virtualization using a library like react-window. This approach renders only the visible items instead of the entire list, which greatly reduces the rendering workload.

I would also review the component structure to ensure efficient rendering. Using techniques such as React.memo or useMemo can help prevent unnecessary re-renders when props or state have not changed. Additionally, I would check that state updates are scoped properly so that only affected components re-render.

After applying optimizations, I would test again to confirm the interface is smoother and responsive even with large datasets.