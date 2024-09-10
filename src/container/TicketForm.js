import React, { useState, useEffect } from "react";
import "../styles.css";

export default function TicketForm({dispatch, editingTicket}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("1");

  useEffect(()=>{
    if(editingTicket){
      setTitle(editingTicket.title)
      setDescription(editingTicket.description)
      setPriority(editingTicket.priority)
    }
    else
      clearForm();
  },[editingTicket])

  const priorityLabel = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setPriority("1");
  };

  const handleEditCancel = ()=>{
    dispatch({type:"CLEAR_EDITING_TICKET"})
    clearForm();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      id : editingTicket? editingTicket.id: new Date().toISOString(),
      title,
      description,
      priority
    }
    
    dispatch({
      type: editingTicket? "UPDATE_TICKET": "ADD_TICKET",
      payload: ticketData
    })

    clearForm();
  };

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <div>
        <label>Title</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="text"
          className="form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabel).map(([value, label]) => (
          <label key={value} className="priority-label">
            <input
              type="radio"
              className="priority-input"
              value={value}
              checked={priority === value}
              onChange={(e) => setPriority(e.target.value)}
            ></input>
              {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button">Submit</button>
      {
        editingTicket && (<button className="button" onClick={handleEditCancel}>Cancel Edit</button>)
      }
    </form>
  );
}
