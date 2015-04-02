Template.addUser.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var email = tpl.find('[name=email]').value;
        var password = tpl.find('[name=password]').value;
        var admin = tpl.find('[name=admin]').checked;
        Meteor.call('createLairUser', email, password, admin, function (err) {
            if (err) {
                tpl.find('[name=password]').value = '';
                return Alerts.insert({
                    "class": "alert-warning",
                    "strong": "Error",
                    "message": err.reason.replace(/\./g, '')
                });
            }
            return Router.go('/settings/users');
        });
    }
});