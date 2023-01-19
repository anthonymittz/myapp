import React from 'react';
import { createRoot } from 'react-dom/client';

function Client()
{
  return (
    <>
      <h1>My App</h1>
    </>
  );
}

createRoot(document.getElementById('root'))
  .render(<Client />);