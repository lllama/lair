Template.settings.helpers({
    allowClientSideUpdates: function () {
        var setting = Settings.findOne({
            setting: 'allowClientSideUpdates'
        });
        if (typeof setting === 'undefined') {
            return false;
        } else {
            return setting.enabled;
        }
    },

    persistViewFilters: function () {
        var setting = Settings.findOne({
            setting: 'persistViewFilters'
        });
        if (typeof setting === 'undefined') {
            return false;
        } else {
            return setting.enabled;
        }
    }
});

Template.settings.events({
    'click .toggle-client-side-updates': function () {
        return Meteor.call('toggleClientSideUpdates');
    },
    'click .toggle-persist-view-filters': function () {
        return Meteor.call('togglePersistViewFilters');
    }
});
