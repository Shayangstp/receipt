//client side

import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const FormView = () => {
  const [forms, setForms] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Set up the socket connection
    const socket = io("http://localhost:12345");
    setSocket(socket);

    // Request the list of forms from the server
    socket.emit("get_forms");

    // Listen for updates to the list of forms
    socket.on("forms_updated", (forms) => {
      setForms(forms);
    });

    // Listen for feedback from the server when a user views a form
    socket.on("user_viewed_form", (formId) => {
      console.log(`User viewed form ${formId}`);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleViewForm = (formId) => {
    // Update the server to record that the user viewed the form
    socket.emit("view_form", formId);
  };

  return (
    <div>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            {form.name}
            <button onClick={() => handleViewForm(form.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormView;
