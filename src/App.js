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
    textAlign: "center",
    // marginTop: 20,
    // marginLeft: 20,
  },
  emptySpace5: {
    height: "5px",
  },
  emptySpace10: {
    height: "10px",
  },
  emptySpace20: {
    height: "20px",
  },
}));

function scheduleReducer(schedule, action) {
  switch (action.type) {
    case "REPLACE":
      let startDate = new Date(action.start);
      let newSchedule = [];

      let nameFilter = action.schedule.filter((item) => {
        return item.summary.includes(action.member);
      });

      nameFilter = action.holidays.concat(nameFilter);
      for (let i = 0; i < 7; i++) {
        let dow = (i + 1) % 7;
        let dowFilter = nameFilter.filter((item) => {
          let from = new Date(
            item.start.date == undefined ? item.start.dateTime : item.start.date
          );
          let to = new Date(
            item.end.date == undefined ? item.end.dateTime : item.end.date
          );

          let dateOffset = new Date(
            startDate.getTime() + i * 24 * 60 * 60 * 1000
          );

          if (item.start.date == undefined) from.setHours(0, 0, 0);
          if (item.end.date == undefined) to.setHours(23, 59, 59);
          if (item.end.date == undefined)
            // 시간 값이 있을 경우
            return (
              dateOffset.getTime() >= from.getTime() &&
              dateOffset.getTime() <= to.getTime()
            );
          else
            return (
              dateOffset.getTime() >= from.getTime() &&
              dateOffset.getTime() <= to.getTime() - 1
            );
        });

        newSchedule.push(
          dowFilter.map((item, idx) => {
            return {
              dayOfWeek: idx == 0 ? getDayOfWeek2(dow) : "",
              summary:
                item.summary.split("-").length > 1
                  ? item.summary.split("-")[1].trim()
                  : item.summary,
              content: item.description,
            };
          })
        );

        if (dowFilter.length == 0)
          newSchedule.push([
            {
              dayOfWeek: getDayOfWeek2(dow),
              summary: "",
              content: "",
            },
          ]);
      }
      return newSchedule;
    default:
      return schedule;
  }
}

function getDayOfWeek(date) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let tempDate = new Date(date);
  return week[tempDate.getDay()];
}

function getDayOfWeek2(day) {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[day];
}
function getMondayDate(date) {
  var paramDate = new Date(date);

  var day = paramDate.getDay();
  var diff = paramDate.getDate() - day + (day == 0 ? -6 : 1);

  var monday = new Date(paramDate.setDate(diff));

  let offset = monday.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(monday.getTime() - offset);

  let isoStr = dateOffset.toISOString().substring(0, 10);
  return isoStr;
}

function getMondayDateTime(date) {
  return `${getMondayDate(date)}T00:00:00Z`;
}

function getSundayDate(date) {
  var paramDate = new Date(date);

  var day = paramDate.getDay();
  var diff = paramDate.getDate() - day + (day == 0 ? 0 : 7);

  var sunday = new Date(paramDate.setDate(diff));

  let offset = sunday.getTimezoneOffset() * 60000; //ms단위라 60000곱해줌
  let dateOffset = new Date(sunday.getTime() - offset);

  let isoStr = dateOffset.toISOString().substring(0, 10);
  return isoStr;
}

function getSundayDateTime(date) {
  return `${getSundayDate(date)}T23:59:59Z`;
}

function addTimeZoneToDateTimeString(date) {
  return date.replace("Z", `${encodeURIComponent("+")}0900`);
}

const App = () => {
  const [lastWeekSchedule, dispatchLastWeek] = useReducer(scheduleReducer, []);
  const [thisWeekSchedule, dispatchThisWeek] = useReducer(scheduleReducer, []);
  const [name, setName] = useState(null);
  const [team, setTeam] = useState(null);
  const [thisWeek, setThisWeek] = useState(null);
  const [lastWeek, setLastWeek] = useState(null);
  const teams = calendarConfig.filters.teams;
  const [names, setNames] = useState([]);
  const classes = useStyles();
  const [calendarID, setCalendarID] = useState("");
  const apiKey = calendarConfig.apiKey;
  const holidayCalID = calendarConfig.holidayCalID;
  const [tHolidays, setTHolidays] = useState([]);
  const [lHolidays, setLHolidays] = useState([]);

  const teamChange = (event) => {
    setTeam(event.target.value);
  };
  const nameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    const today = new Date();
    setThisWeek(`${getMondayDate(today)} ~ ${getSundayDate(today)}`);
    const lastWeek = new Date();
    lastWeek.setDate(new Date().getDate() - 7);
    setLastWeek(`${getMondayDate(lastWeek)} ~ ${getSundayDate(lastWeek)}`);

    const tmon = getMondayDateTime(today);
    const tsun = getSundayDateTime(today);
    const lmon = getMondayDateTime(lastWeek);
    const lsun = getSundayDateTime(lastWeek);

    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${holidayCalID}/events?orderBy=startTime&singleEvents=true&timeMax=${addTimeZoneToDateTimeString(
        tsun
      )}&timeMin=${addTimeZoneToDateTimeString(tmon)}&key=${apiKey}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => setTHolidays(data.items));
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${holidayCalID}/events?orderBy=startTime&singleEvents=true&timeMax=${addTimeZoneToDateTimeString(
        lsun
      )}&timeMin=${addTimeZoneToDateTimeString(lmon)}&key=${apiKey}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => setLHolidays(data.items));
  }, []);

  useEffect(() => {
    if (team == undefined || team == "") return;
    switch (team) {
      case "기술팀":
        setCalendarID(calendarConfig.filters.calendarID[0]);
        setNames(calendarConfig.filters.memebers[0]);
        break;
      case "연구소":
        setCalendarID(calendarConfig.filters.calendarID[1]);
        setNames(calendarConfig.filters.memebers[1]);
        break;
      default:
        break;
    }
  }, [team]);

  useEffect(() => {
    if (name == undefined || name == "") return;

    const today = new Date();
    const tmon = getMondayDateTime(today);
    const tsun = getSundayDateTime(today);
    const lastWeek = new Date();
    lastWeek.setDate(new Date().getDate() - 7);
    const lmon = getMondayDateTime(lastWeek);
    const lsun = getSundayDateTime(lastWeek);

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
          start: tmon,
          end: tsun,
          schedule: data.items,
          member: name,
          holidays: tHolidays,
        })
      );

    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?orderBy=startTime&singleEvents=true&timeMax=${lsun}&timeMin=${lmon}&key=${apiKey}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) =>
        dispatchLastWeek({
          type: "REPLACE",
          start: lmon,
          end: lsun,
          schedule: data.items,
          member: name,
          holidays: lHolidays,
        })
      );
  }, [name]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.emptySpace20} />
      <div className={classes.title}>주간 업무 일정표</div>
      <div className={classes.emptySpace20} />
      <ScheduleFilter
        teams={teams}
        names={names}
        teamChange={teamChange}
        nameChange={nameChange}
      />
      <div className={classes.emptySpace10} />
      <WeeklyView dateRange={lastWeek} schedule={lastWeekSchedule} />
      <div className={classes.emptySpace5} />
      <WeeklyView dateRange={thisWeek} schedule={thisWeekSchedule} />
    </React.Fragment>
  );
};

export default App;
