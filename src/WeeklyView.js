import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  Table,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #999999",
    width: "100%",
    overflowX: "auto",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
}));

const WeeklyView = (data) => {
  const classes = useStyles();
  const { dateRange, schedule } = data;
  return (
    <Container>
      <Paper className={classes.root}>
        <div className={classes.date}>날짜: {dateRange}</div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>요일</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>상세 내용</TableCell>
              <TableCell>비고</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((array) =>
              array.map(({ dayOfWeek, summary, content }, i) => (
                <TableRow key={Date.now() * Math.random()}>
                  <TableCell>{dayOfWeek}</TableCell>
                  <TableCell>{summary}</TableCell>
                  <TableCell>{content}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default WeeklyView;
