Accounts.config({
    'sendVerificationEmail': false,
    'forbidClientAccountCreation': false
});
Accounts.onCreateUser(function (options, user) {
    user.isAdmin = options.isAdmin || false;
    return user;
});
