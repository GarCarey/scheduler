export function getAppointmentsForDay(state, day) {
  const appointmentArr = [];

  for (const stateDay of state.days) {
    if (day === stateDay.name) {
      stateDay.appointments.forEach((appointmentId) => {
        appointmentArr.push(state.appointments[appointmentId]);
      });
    }
  }
  return appointmentArr;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const interviewerArr = [];

  for (const stateDay of state.days) {
    if (day === stateDay.name) {
      stateDay.interviewers.forEach((interviewerId) => {
        interviewerArr.push(state.interviewers[interviewerId]);
      });
    }
  }
  return interviewerArr;
}
