import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL_TEAMS } from "../utils/paths";
import MyModal from "./modal";

import { CSSTransition, TransitionGroup } from "react-transition-group";
//CSSTransition and TransitionGroup are two modules

const Teams = () => {
  const [teams, setTeams] = useState([]); //whole list
  const [filtered, setFiltered] = useState([]); //altered team array
  const [team, setTeam] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    axios.get(URL_TEAMS).then((response) => {
      setTeams(response.data);
      setFiltered(response.data);
    });
  }, []);

  const clearModal = () => {
    setTeam(null);
  };

  const showModalTeam = (data) => {
    setTeam(data);
  };

  const renderList = (filtered) =>
    filtered.map((item, index) => (
      <CSSTransition key={index} timeout={500} classNames="fade">
        <div
          className="team_item"
          onClick={() => {
            showModalTeam(item);
          }}
        >
          <img alt={item.name} src={`/images/teams/${item.logo}`} />
        </div>
      </CSSTransition>
    ));

  const searchTerm = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const list = teams.filter((item) => {
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
      });
      setFiltered(list);
      setKeyword(keyword);
    } else {
      setFiltered(teams);
      setKeyword(keyword);
    }
  };

  return (
    <div className="teams_component">
      <div className="teams_input">
        <input
          type="text"
          placeholder="Search for a team"
          value={keyword}
          onChange={(e) => searchTerm(e)}
        />
      </div>
      <div className="container teams_container">
        <TransitionGroup component="span">
          {renderList(filtered)}
        </TransitionGroup>
      </div>
      <MyModal team={team} clearModal={() => clearModal()} />
    </div>
  );
};

export default Teams;
