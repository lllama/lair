Template.header.projectId = function () {
    return Session.get('projectId');
};

Template.header.projectName = function () {
    var project = Projects.findOne(Session.get('projectId'));
    if (typeof project === 'undefined') {
        return null;
    } else {
        return project.project_name;
    }
};
