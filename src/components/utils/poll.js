import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { URL_TEAMS } from "./paths";
import cookie from "react-cookies";

const Poll = () => {
  const [pollTeams, setPollTeams] = useState([]);
  const [error, setError] = useState(false);

  const getPoll = () => {
    axios
      .get(`${URL_TEAMS}?poll=true&_sort=count&_order=desc`)
      .then((response) => {
        setPollTeams(response.data);
      });
  };

  const addCount = (count, id) => {
    let getCookie = cookie.load("poll");

    if (getCookie === undefined) {
      axios(`${URL_TEAMS}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        data: JSON.stringify({ count: count + 1 }),
      }).then((response) => {
        cookie.save("poll", true);
        getPoll();
      });
    } else {
      setError(true);
    }
  };

  const showPoll = () => {
    const position = ["1ST", "2ND", "3RD"];

    return pollTeams.map((item, index) => {
      return (
        <div
          key={index}
          className="poll_item"
          onClick={() => {
            addCount(item.count, item.id);
          }}
        >
          <img alt={item.team} src={`/images/teams/${item.logo}`} />
          <h4>{position[index]}</h4>
          <div>{item.count} votes</div>
        </div>
      );
    });
  };

  useEffect(() => {
    getPoll();
  }, []);

  console.log(pollTeams);

  return (
    <Fragment>
      <div className="home_poll">
        ` <h3>Who will be the next champions ?</h3>
        <Fragment>
          <div className="poll_container">{showPoll()}</div>
          {error ? (
            <div>
              <p>Sorry, you've already voted.</p>
            </div>
          ) : null}
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Poll;
