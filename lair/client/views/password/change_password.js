Template.changePassword.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var password = tpl.find('[name=password]').value;
        Meteor.call('changeLairUserPassword', Meteor.userId(), password, function (err) {
            if (err) {
                return Alerts.insert({
                    "class": "alert-warning",
                    "strong": "Error",
                    "message": err.reason
                });
            }
            return Router.go('/');
        });
    }
});
