import React from "react";
import dateFns from "date-fns";
import ModalPopup from "./ModalPopup";
import axios from "axios";
import moment from "moment";
import { connect } from "react-redux";
import userLogin from "../app/action/loginAction";
import { useHistory } from "react-router";
import { Button } from "antd";
import userLogout from "../app/action/logoutAction";

class Calendar extends React.Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    date: dateFns.format(new Date(), "D-M-YYYY"),
    dayAPI: [],
    lessons: [],
    visiblePopup: false,
    filename : ""
  };
  componentDidMount() {
    console.log(this.props.username);
    axios({
      method: "post",
      url: "http://127.0.0.1:8080/read-file",
      data: {name : this.props.username},
      responseType: "stream",
    }).then((res) => {
      const dayAPI = res.data.schedule;
      this.setState({ dayAPI });
    }).catch((err) => {
      console.log(err);
    });
  }

  renderHeader() {
    const dateFormat = "MMMM YYYY";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
    const days = [];

    let startDate = dateFns.startOfWeek(this.state.currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    const arrDate = this.state.dayAPI;

  
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = moment(day).format('DD');

        const cloneDay = day;
        let hasCalendar = "";
        let lessons = {};
        let checkDay = moment(day).format('YYYY-MM-DD')
       
        for (let index = 0; index < arrDate.length; index++) {
          const date = arrDate[index].date;

          if (checkDay === date) {  
            hasCalendar = "has-calendar";
            lessons = arrDate[index].lessons;
          } 
        }
       

        days.push(
          <div
            className={`col cell ${hasCalendar} ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay), lessons)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  setLessons = (day, arrDate) => {
    for (let i = 0; i < arrDate.length; i++) {
      if (arrDate[i].date === day) {
        this.setState({
          lessons: arrDate[i].lessons
        })
      }
    }
  }

  onDateClick = (day, lessons) => {
    this.setState({
      selectedDate: day,
      date: dateFns.format(day, "D-M-YYYY"),
      lessons: lessons,
    });
    this.showCalendar(day);
  };

  showCalendar = (day) => {
    this.changeVisible(this.state.visiblePopup);
  };
  changeVisible = (visible) => {
    this.setState({
      visiblePopup: !visible,
    });
  };

  setVisible = (visible) => {
    this.setState({
      visiblePopup: visible,
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  logOut = () => {
    this.props.userLogout()
  }

  render() {
    
    return (
      <div className="calendar">
        <Button onClick={this.logOut}>ĐĂNG XUẤT</Button>
        {this.renderHeader()}
        {this.renderDays()}
        {this.renderCells()}
        <ModalPopup
          visible={this.state.visiblePopup}
          changeVisible={this.changeVisible}
          setVisible={this.setVisible}
          date={this.state.date}
          dayAPI={this.state.dayAPI}
          lessons={this.state.lessons}
          setLessons={this.setLessons}
        />
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    isAuthenticated : state.login.isAuthenticated,
    username : state.login.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  userLogout : userInfo => dispatch(userLogout(userInfo))
})


export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
