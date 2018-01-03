import React from 'react';
import NavBar from '../NavBar/NavBar';

export default function PageWithNav(props) {
  return (
    <div>
      <NavBar />
      {props.children}
    </div>
  );
}
