Template.addPort.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var id = Session.get('projectId');
        var hid = Session.get('hostId');
        var port = tpl.find('[name=port]').value;
        var protocol = tpl.find('[name=protocol]').value || 'tcp';
        var service = tpl.find('[name=service]').value || 'Unknown';
        var product = tpl.find('[name=product]').value || 'Unknown';
        Meteor.call('addPort', id, hid, port, protocol, service, product, function (err, res) {
            if (err) {
                return Alerts.insert({
                    "class": "alert-warning",
                    "strong": "Error",
                    "message": err.reason
                });
            }
            return Router.go('/project/' + id + '/services/' + res);
        });
    }
});
