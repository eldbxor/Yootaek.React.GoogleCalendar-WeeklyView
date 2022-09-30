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
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const { dateRange, schedule } = data;
  //   const dayOfWeek = week[new Date().getDay()];
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
            <TableRow>
              <TableCell>월</TableCell>
              <TableCell>업무1</TableCell>
              <TableCell>업무 내용1</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>업무2</TableCell>
              <TableCell>업무 내용2</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>업무2</TableCell>
              <TableCell>업무 내용2</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>업무2</TableCell>
              <TableCell>업무 내용2</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>업무2</TableCell>
              <TableCell>업무 내용2</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>업무2</TableCell>
              <TableCell>업무 내용2</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default WeeklyView;
