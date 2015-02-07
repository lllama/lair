Template.projects.projects = function () {
    return Projects.find({}, {
        sort: {
            project_name: 1
        }
    }).fetch();
};

Template.projects.events({
    'click .project': function () {
        Session.set('loading', true);
        Session.set('projectId', this._id);
    }
});
