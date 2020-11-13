import React, { Fragment, useState } from "react";
import axios from "axios";
import { URL_SUBS } from "./paths";

const Subscriptions = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyIn, setAlreadyIn] = useState(false);

  const saveSubscription = (email) => {
    axios.get(`${URL_SUBS}?email=${email}`).then((response) => {
      if (!response.data.length) {
        axios(URL_SUBS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            email: email,
          }),
        }).then((response) => {
          setSuccess({
            success: true,
          });
          setEmail("");
          clearMessages();
        });
      } else {
        setEmail("");
        setAlreadyIn(true);
        clearMessages();
      }
    });
  };

  const clearMessages = () => {
    setTimeout(() => {
      setError(false);
      setSuccess(false);
      setAlreadyIn(false);
    }, 2000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let regex = /\S+@\S+\.\S+/;
    if (regex.test(email)) {
      saveSubscription(email);
    } else {
      setError(true);
      clearMessages();
    }
  };

  return (
    <Fragment>
      <div className="subcribe_panel">
        <h3>Subscribe to use</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="your email@gmail.com"
              value={email}
              onChange={(evt) => {
                setEmail(evt.target.value);
              }}
            />
            <div className={error ? "error show" : "error"}>
              Check your email
            </div>
            <div className={success ? "success show" : "success"}>
              Thank you
            </div>
            <div className={alreadyIn ? "success show" : "success"}>
              You are already on the DB
            </div>
          </form>
        </div>
        <small>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </small>
      </div>
    </Fragment>
  );
};

export default Subscriptions;
