import { login } from '../data.js';
import { html } from '../lib.js';
import { createSubmitHandler} from '../utils.js';

let loginTemplate = (eventHandler, errMessage, errors) => html`
<section id="login">
    <form id="login-form" @submit="${eventHandler}">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text" class="${errors.email ? 'is-invalid' : null}">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password"  class="${errors.password ? 'is-invalid' : null}">
            ${errMessage ? html`<div><p class="error">${errMessage}</p></div>` : null}
            <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>`

export async function loginPage(ctx) {
    update();
    async function onLogin(data) {
        try {
            if (data.email == "" || data.password == "") {
                throw {
                    error: new Error('All fields are required!'),
                    errors: {
                        email: data.email == "",
                        password: data.password == ""
                    }
                }
            }

            await login(data.email, data.password);
            ctx.updateNav();
            ctx.page.redirect('/');
        } catch (err) {
            let message = err.message || err.error.message
            update(message, err.errors)
        }
    }
    function update(errMessage = undefined, errors = {}) {
        ctx.render(loginTemplate(createSubmitHandler(onLogin), errMessage, errors));
    }
}