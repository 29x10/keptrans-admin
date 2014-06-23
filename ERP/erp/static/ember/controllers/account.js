App.LoginController = Ember.ObjectController.extend({

    username: "",

    password: "",

    actions: {
        login: function () {

            var user_data = {
                username: this.get('username'),
                password: this.get('password')
            };

            this.get('session').authenticate('authenticator:custom', user_data).then(null, function(error) {
                console.log(error);
            });
        }

    }
});

