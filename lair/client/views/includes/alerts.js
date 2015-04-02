Alerts = new Meteor.Collection(null);

Template.alerts.helpers({
    alerts: function () {
        return Alerts.find({}).fetch();
    }
});

Template.alerts.events({
    'click a': function () {
        Alerts.remove(this._id);
    }
});
