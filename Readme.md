# jQuery CaptchaWrapper
[Homepage](https://www.berlinsms.de/)

# Description

This captcha wrapper makes it easy to include multiple types of captcha on your site. 

This can be helpful if, for example, you want to let your customers choose the type of captcha.

The libraries of the unused captchas are not loaded.

# Usage

Include jquery    
```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
```

Download bsms-captcha-wrapper
```link
https://raw.githubusercontent.com/berlinSMS/captcha-wrapper/main/bsms-captcha-wrapper.js
```

Include bsms-captcha-wrapper
```html
<script src="bsms-captcha-wrapper.js"></script>
```

Find your jquery-container and assign captcha-wrapper
```js
$('.plugin-container').bsmsCaptchaWrapper();    
```

Make sure, the script is fully loaded, before you assign captcha-wrapper, e.g. use jquerys 'ready'
```js
$(document).ready(function () {
    $('.plugin-container').bsmsCaptchaWrapper();
});    
```

Provide options:
```js
$(document).ready(()=>{
    $('.plugin-container').bsmsCaptchaWrapper( { sitekey:'asdfghjklasdfghjkl' } );
});    
```

Provide callbacks:
```js
$(document).ready(function () {
    $('.plugin-container')
        .bsmsCaptchaWrapper( { sitekey:'asdfghjklasdfghjkl' } )
        .onSolved(captchaSolved)
        .onExpired(captchaExpired);
});    
function captchaSolved(token) {
    alert(`Captcha solved with token=${token}`);
}
function captchaExpired() {
    alert(`Captcha expired`);
}
```

# Options

| Option      | DESCRIPTION                                                                                                                                               | DEFAULT                    |
|-------------|---------------------------------------------------------------|-----------|
| captchaType | Type of captcha used. Feel free to add more types of captchas | reCaptcha |
| sitekey     | Sitekey of recaptcha or hcaptcha or anycaptcha                |           |
| onLoad      | Callback that fires when the captcha has loaded               | null      |
| onSolved    | Callback that is triggered when the captcha has been solved   | null      |
| onExpired   | Callback triggered when the captcha expires                   | null      |
| onError     | Callback, will be triggered, if something is wrong            | null      |
                                                                                                                                                                            
