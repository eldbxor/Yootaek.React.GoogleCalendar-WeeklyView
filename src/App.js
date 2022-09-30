import React, { useEffect, useReducer, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import WeeklyView from "./WeeklyView";
import calendarConfig from "./AppConfig.json";
import ScheduleFilter from "./ScheduleFilter";

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: 35,
    textDecoration: "underline",
    fontWeight: "bold",
    color: "#000000",
    marginTop: 20,
    marginLeft: 20,
  },
  emptySpace: {
    height: "5px",
  },
}));
function scheduleReducer(schedule, action) {
  switch (action.type) {
    case "REPLACE":
      console.log(action.member);
      console.log(action.schedule);
      let newSchedule = action.schedule.filter((item) => {
        return item.summary.includes(action.member);
      });
      console.log(newSchedule);
      return newSchedule;
    default:
      return schedule;
  }
}

function getMondayDate(date) {
  var paramDate = new Date(date);

  var day = paramDate.getDay();
  var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);
  var isoStr = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);
  return isoStr + "T00:00:00Z";
}

function getSundayDate(date) {
  var paramDate = new Date(date);

  var day = paramDate.getDay();
  var diff = paramDate.getDate() - day + (day == 0 ? 0 : 7);
  var isoStr = new Date(paramDate.setDate(diff)).toISOString().substring(0, 10);

  return isoStr + "T23:59:59Z";
}

function dateTest() {
  let testDate = new Date();
  testDate.setDate(new Date().getDate() + 1);
  let mon = getMondayDate(testDate);
  let sun = getSundayDate(testDate);
  console.log(`this week's monday: ${mon}`);
  console.log(`this week's sunday: ${sun}`);
}

const App = () => {
  const [lastWeekSchedule, dispatchLastWeek] = useReducer(scheduleReducer, []);
  const [thisWeekSchedule, dispatchThisWeek] = useReducer(scheduleReducer, []);
  const [name, setName] = useState(null);
  const [team, setTeam] = useState(null);
  const teams = ["연구소", "기술팀"];
  const names = ["이유택", "김정원", "김태호"];
  const classes = useStyles();
  const calendarID = calendarConfig.calendarID;
  const apiKey = calendarConfig.apiKey;

  const teamChange = (event) => {
    console.log(event.target.value);
    setTeam(event.target.value);
  };
  const nameChange = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
    // getSchedule(thisWeek, lastWeek);
  };

  useEffect(() => {
    const today = new Date();
    const tmon = getMondayDate(today);
    const tsun = getSundayDate(today);
    const lastWeek = new Date();
    lastWeek.setDate(new Date().getDate() - 7);
    const lmon = getMondayDate(lastWeek);
    const lsun = getSundayDate(lastWeek);
    // dateTest();
    // updateThisWeek({ mon, sun });
  }, []);

  useEffect(() => {
    const today = new Date();
    const tmon = getMondayDate(today);
    const tsun = getSundayDate(today);
    console.log(`this mon: ${tmon}, this sun: ${tsun}`);
    // console.log(`last mon: ${lastWeek.mon}, last sun: ${lastWeek.sun}`);
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?orderBy=startTime&singleEvents=true&timeMax=${tsun}&timeMin=${tmon}&key=${apiKey}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) =>
        dispatchThisWeek({
          type: "REPLACE",
          schedule: data.items,
          member: name,
        })
      );
  }, [name]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.title}>주간 업무 일정표</div>
      <ScheduleFilter
        teams={teams}
        names={names}
        teamChange={teamChange}
        nameChange={nameChange}
      />
      <WeeklyView />
      <div className={classes.emptySpace} />
      <WeeklyView />
    </React.Fragment>
  );
};

export default App;
