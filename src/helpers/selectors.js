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
