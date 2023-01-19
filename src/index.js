import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom';
import './styles/main.css';

function Client()
{
  return (
    <BrowserRouter basename='/myapp'>
      <header>
        <h1>My App</h1>
        <nav>
          <Link to='/'>Homepage</Link>
          <Link to='/a'>Route A</Link>
          <Link to='/b'>Route B</Link>
          <Link to='/non-existent'>Non-existent</Link>
        </nav>
      </header>
      <Routes>
        <Route path='/' element={<Wrapper />}>
          <Route index element={<Homepage />} />
          <Route path='a' element={<RouteA />} />
          <Route path='b' element={<RouteB />} />
          <Route path='*' element={<Fallback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Wrapper()
{
  return <main><Outlet /></main>
}

function Homepage()
{
  return <><h2>Homepage</h2></>;
}

function RouteA()
{
  return <><h2>Route A</h2></>;
}

function RouteB()
{
  return <><h2>Route B</h2></>;
}

function Fallback()
{
  return <><h2>Page not found</h2></>
}

createRoot(document.getElementById('root'))
  .render(<Client />);