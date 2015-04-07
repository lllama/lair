Template.header.helpers({
    projectId: function () {
        return Session.get('projectId');
    },
    projectName: function () {
        var project = Projects.findOne(Session.get('projectId'));
        if (typeof project === 'undefined') {
            return null;
        } else {
            return project.project_name;
        }
    }
});
