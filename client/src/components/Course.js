import React from "react";

export default function Course(props) {
  return (
    <li>
      {props.title} {props.subscription_based ? '(subscription)' : ''}
    </li>
  );
}