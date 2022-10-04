import React from "react";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    display: "flex",
    justifyContent: "center",
  },
}));

const ScheduleFilter = ({ teams, names, teamChange, nameChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="select-team-label">Team</InputLabel>
        <Select
          labelId="select-team-label"
          id="select-team"
          label="Team"
          onChange={teamChange}
        >
          {teams.map((team) => (
            <MenuItem key={team} value={team}>
              {team}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="select-name-label">Name</InputLabel>
        <Select
          labelId="select-name-label"
          id="select-name"
          label="Name"
          onChange={nameChange}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ScheduleFilter;
