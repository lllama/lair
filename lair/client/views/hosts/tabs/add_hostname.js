Template.addHostname.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var projectId = Session.get('projectId');
        var hostId = Session.get('hostId');
        var hostname = tpl.find('[name=hostname]').value;
        Meteor.call('addHostname', projectId, hostId, hostname, function (err) {
            if (err) {
                return Alerts.insert({
                    class: 'alert-warning',
                    strong: 'Error',
                    message: err.reason
                });
            }
            return Router.go('/project/' + projectId + '/hosts/' + hostId + '/hostnames');
        });
    }
});
