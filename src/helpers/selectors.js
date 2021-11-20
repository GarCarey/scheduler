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
