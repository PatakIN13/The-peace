jQuery(document).ready(function($){
    var formModal = $('.cd-fr-user-modal'),
        formLogin = formModal.find('#cd-fr-login'),
        formSignup = formModal.find('#cd-fr-signup'),
        formForgotPassword = formModal.find('#cd-fr-reset-password'),
        formModalTab = $('.cd-fr-switcher'),
        tabLogin = formModalTab.children('li').eq(0).children('a'),
        tabSignup = formModalTab.children('li').eq(1).children('a'),
        forgotPasswordLink = formLogin.find('.cd-fr-form-bottom-message a'),
        backToLoginLink = formForgotPassword.find('.cd-fr-form-bottom-message a'),
        mainNav = $('.main-nav');

    //open modal
    mainNav.on('click', function(event){
        $(event.target).is(mainNav) && mainNav.children('ul').toggleClass('is-fr-visible');
    });

    //open sign-up form
    mainNav.on('click', '.cd-fr-signup', signup_selected);
    //open login-form form
    mainNav.on('click', '.cd-fr-signin', login_selected);

    //close modal
    formModal.on('click', function(event){
        if( $(event.target).is(formModal) || $(event.target).is('.cd-fr-close-form') ) {
            formModal.removeClass('is-fr-visible');
        }
    });
    //close modal when clicking the esc keyboard button
    $(document).keyup(function(event){
        if(event.which=='27'){
            formModal.removeClass('is-fr-visible');
        }
    });

    //switch from a tab to another
    formModalTab.on('click', function(event) {
        event.preventDefault();
        ( $(event.target).is( tabLogin ) ) ? login_selected() : signup_selected();
    });

    //hide or show password
    $('.hide-password').on('click', function(){
        var togglePass= $(this),
            passwordField = togglePass.prev('input');

        ( 'password' == passwordField.attr('type') ) ? passwordField.attr('type', 'text') : passwordField.attr('type', 'password');
        ( 'Hide' == togglePass.text() ) ? togglePass.text('Show') : togglePass.text('Hide');
        //focus and move cursor to the end of input field
        passwordField.putCursorAtEnd();
    });

    //show forgot-password form
    forgotPasswordLink.on('click', function(event){
        event.preventDefault();
        forgot_password_selected();
    });

    //back to login from the forgot-password form
    backToLoginLink.on('click', function(event){
        event.preventDefault();
        login_selected();
    });

    function login_selected(){
        mainNav.children('ul').removeClass('is-fr-visible');
        formModal.addClass('is-fr-visible');
        formLogin.addClass('is-fr-selected');
        formSignup.removeClass('is-fr-selected');
        formForgotPassword.removeClass('is-fr-selected');
        tabLogin.addClass('selected');
        tabSignup.removeClass('selected');
    }

    function signup_selected(){
        mainNav.children('ul').removeClass('is-fr-visible');
        formModal.addClass('is-fr-visible');
        formLogin.removeClass('is-fr-selected');
        formSignup.addClass('is-fr-selected');
        formForgotPassword.removeClass('is-fr-selected');
        tabLogin.removeClass('selected');
        tabSignup.addClass('selected');
    }

    function forgot_password_selected(){
        formLogin.removeClass('is-fr-selected');
        formSignup.removeClass('is-fr-selected');
        formForgotPassword.addClass('is-fr-selected');
    }

    //REMOVE THIS - it's just to show error messages
    formLogin.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        formLogin.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-fr-visible');
    });
    formSignup.find('input[type="submit"]').on('click', function(event){
        event.preventDefault();
        formSignup.find('input[type="email"]').toggleClass('has-error').next('span').toggleClass('is-fr-visible');
    });


    //IE9 placeholder fallback
    //credits http://www.hagenburger.net/BLOG/HTML5-Input-Placeholder-Fix-With-jQuery.html
    if(!Modernizr.input.placeholder){
        $('[placeholder]').focus(function() {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        }).blur(function() {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.val(input.attr('placeholder'));
            }
        }).blur();
        $('[placeholder]').parents('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                }
            })
        });
    }

});


//credits http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
jQuery.fn.putCursorAtEnd = function() {
    return this.each(function() {
        // If this function exists...
        if (this.setSelectionRange) {
            // ... then use it (Doesn't work in IE)
            // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
            var len = $(this).val().length * 2;
            this.focus();
            this.setSelectionRange(len, len);
        } else {
            // ... otherwise replace the contents with itself
            // (Doesn't work in Google Chrome)
            $(this).val($(this).val());
        }
    });
};