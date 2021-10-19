import React from "react";

const Container = ({ children }) => {
  return (
    <main className="my-8 flex-grow">
      <div className="container mx-auto px-6">{children}</div>
    </main>
  );
};

export default Container;
