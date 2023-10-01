 /** 
 * This captcha wrapper makes it easy to include multiple types of captcha on your site. 
 * This can be helpful if, for example, you want to let your customers choose the type of captcha.
 * The libraries of the unused captchas are not loaded.
 *  - You need to import jquery
 *
 * @copyright Copyright (c) 2023, Energieweise Ingenieur GmbH, berlinsms
 * @link      https://www.berlinsms.de/
 * 
 * Hiermit wird jeder Person, die eine Kopie dieser Software und der zugehoerigen
 * Dokumentationsdateien (die "Software") erwirbt, kostenlos die Erlaubnis erteilt, 
 * uneingeschraenkt mit der Software zu handeln, einschliesslich und ohne 
 * Einschraenkung der Rechte, Kopien der Software zu verwenden, zu kopieren, zu 
 * modifizieren, zusammenzufuehren, zu veroeffentlichen, zu vertreiben, zu 
 * unterlizenzieren und/oder zu verkaufen, und Personen, denen die Software zur 
 * Verfuegung gestellt wird, dies unter den folgenden Bedingungen zu gestatten:
 * 
 * Dieser Copyright-Hinweis und dieser Genehmigungshinweis muessen in allen Kopien 
 * oder wesentlichen Teilen der Software enthalten sein.
 * 
 * DIE SOFTWARE WIRD OHNE MAENGELGEWAEHR ZUR VERFUEGUNG GESTELLT, OHNE AUSDRUECKLICHE 
 * ODER STILLSCHWEIGENDE GEWAEHRLEISTUNG JEGLICHER ART, EINSCHLIESSLICH, ABER NICHT
 * BESCHRAENKT AUF DIE GEWAEHRLEISTUNG DER MARKTGAENGIGKEIT, DER EIGNUNG FUER EINEN 
 * BESTIMMTEN ZWECK UND DER NICHTVERLETZUNG VON RECHTEN. IN KEINEM FALL HAFTEN DIE 
 * AUTOREN ODER URHEBERRECHTSINHABER FUER JEGLICHE ANSPRUECHE, SCHAEDEN ODER SONSTIGE 
 * HAFTUNG, SEI ES DURCH VERTRAG, UNERLAUBTE HANDLUNGEN ODER ANDERWEITIG, DIE SICH 
 * AUS DER SOFTWARE ODER DER NUTZUNG DER SOFTWARE ODER DEM SONSTIGEN UMGANG MIT 
 * DER SOFTWARE ERGEBEN ODER DAMIT ZUSAMMENHAENGEN.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of 
 * this software and associated documentation files (the "Software"), to deal in 
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the 
 * Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 * 
 * This copyright notice and this permission notice must be included in all copies 
 * or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR
 * IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE WARRANTIES OF MERCHANTABILITY, 
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE 
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIMS, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN CONTRACT, TORT OR OTHERWISE, ARISING OUT OF OR RELATED TO THE SOFTWARE 
 * OR THE USE OF OR OTHER DEALINGS WITH THE SOFTWARE.
 * 
 */

 (function ($) {
    $.fn.bsmsCaptchaWrapper = function (options) {

        var settings = $.extend({
            captchaType: 'reCaptcha',
            sitekey: '',
            onLoad:    null,
            onSolved:  null,
            onExpired: null,
            onError:   null,
        }, options);

        this.each(function () {
            const $container = $(this);

            if (settings.captchaType === 'hCaptcha') {
                // Laden Sie hCaptcha
                var captchaScriptUrl = 'https://hcaptcha.com/1/api.js';
                $.getScript(captchaScriptUrl, function () {
                    if (typeof settings.onLoad == 'function') settings.onLoad();
                    hcaptcha.render($container.get(0), {
                        sitekey: settings.sitekey,
                        callback: settings.onSolved,
                        'expired-callback': settings.onExpired,
                        'error-callback': settings.onError
                    });
                });
            } else if (settings.captchaType === 'reCaptcha') {
                var captchaScriptUrl = 'https://www.google.com/recaptcha/api.js';
                $.getScript(captchaScriptUrl, function () {
                    if (typeof settings.onLoad == 'function') settings.onLoad();
                    grecaptcha.ready(() => {
                        grecaptcha.render($container.get(0), {
                            'sitekey': settings.sitekey,
                            'callback': settings.onSolved,
                            'expired-callback': settings.onExpired,
                            'error-callback': settings.onError
                        });
                    });
                });
            }
        });

        this.onLoad = callback => { settings.onLoad = callback; return this; };
        this.onSolved = callback => { settings.onSolved = callback; return this; };
        this.onExpired = callback => { settings.onExpired = callback; return this; };
        this.onError = callback => { settings.onError = callback; return this; };

        return this;
    }
})(jQuery);