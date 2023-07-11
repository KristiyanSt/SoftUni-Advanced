import { register } from '../data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const registerTemplate = (eventHandler,errorMsg,errors) => html`
<section id="register">
            <form id="register-form" @submit=${eventHandler}>
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input class=${errors.username ? 'is-invalid' : null} id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input class=${errors.email ? 'is-invalid' : null} id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input class=${errors.password ? 'is-invalid' : null} id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input class=${errors.repeatPass ? 'is-invalid' : null} id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    ${errorMsg ? html`<div><p class="error">${errorMsg}</p></div>` : null}
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>`

export async function registerPage(ctx) {
    update();
    async function onRegister(data) {
        let errors = {};
        if (data.password !== data.repeatPass) {
            errors.password = data.password,
            errors.repeatPass = data.repeatPass
        }

        let entries = Object.entries(data);
        let errorsEntries = entries.filter(([type, val]) => val.trim() == "");
        Object.assign(errors, errorsEntries.reduce((a, [k, v]) => Object.assign(a, { [k]: true }), {}));
        try {
            if (errors.password !== errors.repeatPass && Object.keys(errors).length == 2) {
                throw {
                    error: new Error('Passwords must match!'),
                    errors
                }
            } else if (Object.keys(errors).length > 0) {
                throw {
                    error: new Error('All fields are required!'),
                    errors
                }
            }
            await register(data);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            let message = err.message || err.error.message;
            update(message, errors);
        }
    }
    function update(errorMsg = undefined, errors = {}) {
        ctx.render(registerTemplate(createSubmitHandler(onRegister), errorMsg, errors));
    }
}