Template.hostTagList.helpers({
    tags: function () {
        var host = Hosts.findOne({
            project_id: Session.get('projectId'),
            _id: Session.get('hostId')
        });
        if (!host) {
            return false;
        }
        return host.tags;
    }
});

Template.hostTagList.events({
    'submit form': function (event, tpl) {
        event.preventDefault();
        var projectId = Session.get('projectId');
        var hostId = Session.get('hostId');
        var tag = tpl.find('[name=tag]').value;
        Meteor.call('addHostTag', projectId, hostId, tag, function (err) {
            if (err) {
                return Alerts.insert({
                    class: 'alert-warning',
                    strong: 'Error',
                    message: err.reason
                });
            }
            tpl.find('[name=tag]').value = '';
        });
    },

    'click #remove-tags': function () {
        var projectId = Session.get('projectId');
        var hostId = Session.get('hostId');
        var tagIds = [];
        var inputs = $('.tag-checked');
        inputs.each(function () {
            if ($(this).is(':checked')) {
                tagIds.push($(this).attr('id'));
            }
        });
        tagIds.forEach(function (id) {
            Meteor.call('removeHostTag', projectId, hostId, id);
        });
    }
});
