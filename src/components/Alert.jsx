import React from 'react';

export default function Alert(props) {
  const { message, type } = props

  if (!message) return null

  return <div className={`alert ${type}`}>{message}</div>
}
