const base_url = ""

export default {
  GetAllMembers: `https://api.github.com/repos/INTECS-ITFAC/intecs_webapp_front-end/contributors?q=contributions&order=desc`,
  GetAllProjects: `https://api.github.com/repos/INTECS-ITFAC/intecs_webapp_back-end/contributors?q=contributions&order=desc`,
  Get_all_events: `https://dev-dot-intecs-webapp.el.r.appspot.com/events`,

  project: base_url + "project"
};
