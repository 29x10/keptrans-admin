App.SignupController = Ember.ObjectController.extend({

    username: "",

    password: "",

    passwordConfirmed: "",

    actions: {
        signup: function () {
            var new_user_data = {
                username: this.get('username'),
                password: this.get('password'),
                passwordConfirmed: this.get('passwordConfirmed')
            };

            var ajaxError = function (jqXHR) {
                if (jqXHR) {
                    jqXHR.then = null;
                }
                return jqXHR;
            };

            var add_user = new Ember.RSVP.Promise(function (resolve, reject) {

                var hash = {
                    url: App.API_HOST + '/' + App.API_NAME_SPACE + '/' + 'account',
                    type: "POST",
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify(new_user_data)
                };

                hash.success = function (response) {
                    Ember.run(null, resolve, response);
                };

                hash.error = function(jqXHR) {
                    Ember.run(null, reject, ajaxError(jqXHR));
                };
                Ember.$.ajax(hash);
            });

            add_user.then(function () {});
        }

    }
});



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

