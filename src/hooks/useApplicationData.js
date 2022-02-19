import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    const dayApi = axios.get("/api/days");
    const appApi = axios.get("/api/appointments");
    const interviewerApi = axios.get("/api/interviewers");

    Promise.all([dayApi, appApi, interviewerApi]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function findDay(day) {
    const daysObj = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thuesday: 3,
      Friday: 4,
    };
    return daysObj[day];
  }

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const foundDay = findDay(state.day);
    const days = state.days;

    let day = {
      ...state.days[foundDay],
      spots: state.days[foundDay].spots,
    };

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[foundDay],
        spots: state.days[foundDay].spots - 1,
      };
    } else {
      day = {
        ...state.days[foundDay],
        spots: state.days[foundDay].spots,
      };
    }

    days[foundDay] = day;

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
    };

    appointment.interview = null;

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const foundDay = findDay(state.day);
    const days = state.days;

    let day = {
      ...state.days[foundDay],
      spots: state.days[foundDay].spots + 1,
    };

    days[foundDay] = day;

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
