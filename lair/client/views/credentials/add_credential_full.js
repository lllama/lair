Template.addCredentialFull.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var projectId = Session.get('projectId');
        var ip = tpl.find('[name=host]').value;
        var p = tpl.find('[name=port]').value;
        var host = Hosts.findOne({
            project_id: projectId,
            string_addr: ip
        });
        if (typeof host === 'undefined') {
            return Alerts.insert({
                class: 'alert-warning',
                strong: 'Error',
                message: 'The host provided does not exist'
            });
        }
        var port = Ports.findOne({
            project_id: projectId,
            host_id: host._id,
            port: parseInt(p)
        });
        if (typeof port === 'undefined') {
            return Alerts.insert({
                class: 'alert-warning',
                strong: 'Error',
                message: 'The port provided does not exist'
            });
        }
        var username = tpl.find('[name=username]').value || 'unknown';
        var password = tpl.find('[name=password]').value || 'unknown';
        var hash = tpl.find('[name=hash]').value || 'unknown';
        Meteor.call('addCredential', projectId, port._id, username, password, hash, function (err) {
            if (err) {
                return Alerts.insert({
                    class: 'alert-warning',
                    strong: 'Error',
                    message: err.reason
                });
            }
            return Router.go('/project/' + projectId + '/credentials');
        });
    }
});
