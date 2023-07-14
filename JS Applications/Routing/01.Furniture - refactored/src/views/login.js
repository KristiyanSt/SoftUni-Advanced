import { login } from '../data.js';
import { html, nothing } from '../lib.js';

const loginTemplate = function (onLogin, errorMessage, errors) {
    return html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onLogin}>
${errorMessage ? html`<div class="error">${errorMessage}</div>` : nothing}
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${'form-control' + (errors.email  ? ' is-invalid' : '')} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (errors.password ? ' is-invalid' : '')} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`
}

export async function loginPage(ctx) {

    update(undefined, {});

    async function onLogin(e) {
        e.preventDefault();

        let formData = new FormData(e.target);
        let email = (formData.get('email')).trim();
        let password = (formData.get('password')).trim();

        try {
            if (email == "" || password == "") {
                throw {
                    error: new Error('All fields are required'),
                    errors: {
                        email: email == "",
                        password: password == ""
                    }
                }
            }

            await login({ email, password });
            ctx.setUserNav();
            ctx.page.redirect('/');
        } catch (error) {
            let message = error.message || error.error.message;
            update(message, error.errors || {})
        }
    }
    function update(errorMessage, errors) {
        ctx.renderView(loginTemplate(onLogin, errorMessage, errors));
    }
}