import React, { useEffect } from "react";

const App = () => {
  const calendarID = "";
  const apiKey = "";

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?orderBy=startTime&singleEvents=true&timeMax=2022-09-30T00:00:00Z&timeMin=2022-09-26T00:00:00Z&key=${apiKey}`,
      {
        method: "GET",
      }
    ).then((data) => console.log(data.json()));
  }, []);

  return <div>테스트</div>;
};

export default App;
