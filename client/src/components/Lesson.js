import React from "react";

export default function Lesson(props) {
  return (
    <div className="row">
      <div className="col">
        {props.title}
      </div>
    </div>
  );
}
