// Inserts the current version number
Meteor.startup(function () {
    Versions.remove({});
    Versions.insert({
        version: DOC_VERSION
    });
});
