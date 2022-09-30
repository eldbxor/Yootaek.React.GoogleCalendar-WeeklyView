import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ScheduleFilter = ({ teams, names, teamChange, nameChange }) => {
  // const handleChange = (event: SelectChangeEvent) => {
  //     setAge(event.target.value as string);
  //   };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
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
      <FormControl sx={{ m: 1, minWidth: 120 }}>
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
