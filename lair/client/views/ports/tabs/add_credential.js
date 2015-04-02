Template.addCredential.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var username = tpl.find('[name=username]').value || 'unknown';
        var password = tpl.find('[name=password]').value || 'unknown';
        var hash = tpl.find('[name=hash]').value || 'unknown';
        var projectId = Session.get('projectId');
        var portId = Session.get('portId');
        Meteor.call('addCredential', projectId, portId, username, password, hash, function (err) {
            if (err) {
                return Alerts.insert({
                    "class": "alert-warning",
                    "strong": "Error",
                    "message": err.reason
                });
            }
            return Router.go('/project/' + projectId + '/services/' + portId + '/credentials');
        });
    }
});
