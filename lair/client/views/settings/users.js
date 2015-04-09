Template.users.helpers({
    users: function () {
        return Meteor.users.find({
            _id: {
                $not: Meteor.userId()
            }
        }).fetch();
    }
});

Template.users.events({
    'click #remove-user': function () {
        var inputs = $('.user-checked');
        var userIds = [];
        inputs.each(function () {
            if ($(this).is(':checked')) {
                userIds.push($(this).attr('id'));
            }
        });
        userIds.forEach(function (id) {
            Meteor.call('removeLairUser', id);
        });
    }
});
