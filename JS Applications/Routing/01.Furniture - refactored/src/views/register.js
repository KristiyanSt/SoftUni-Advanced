import { register } from "../data.js";
import { html, nothing } from "./../lib.js";

const registerTemplate = (onRegister, errorMessage, errors) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Register New User</h1>
    <p>Please fill all fields.</p>
</div>
</div>
<form @submit=${onRegister}>
<div class="row space-top">
    <div class="col-md-4">
    ${errorMessage ? html`<div class="form-group error">${errorMessage}</div>` : nothing}
        <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input class=${'form-control' + (errors.email  ? ' is-invalid' : '')} id="email" type="text" name="email">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="password">Password</label>
            <input class=${'form-control' + (errors.password  ? ' is-invalid' : '')} id="password" type="password" name="password">
        </div>
        <div class="form-group">
        <label class="form-control-label" for="rePass">Repeat</label>
            <input class=${'form-control' + (errors.rePass  ? ' is-invalid' : '')} id="rePass" type="password" name="rePass">
        </div>
        <input type="submit" class="btn btn-primary" value="Register" />
    </div>
    </div>
</form>
</div>`;


export async function registerPage(ctx) {

    update(undefined, {});

    function update(message, errors) {
        ctx.renderView(registerTemplate(onRegister, message, errors));
    }

    async function onRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        let formObj = [...formData.entries()]
            .reduce((acc, [key, value]) => Object.assign(acc, { [key]: value.trim() }), {});

        try {
            if (formObj.email == "" || formObj.password == "") {
                throw {
                    error: new Error("All fields are required!"),
                    errors: {
                        email: formObj.email == "",
                        password: formObj.password == "",
                        rePass: formObj.password != formObj.rePass
                    }
                }
            } else if (formObj.password != formObj.rePass) {
                throw {
                    error: new Error("Passwords must match!"),
                    errors: {
                        rePass: true
                    }
                }
            }

            await register({ email: formObj.email, password: formObj.password });
            ctx.setUserNav();
            ctx.page.redirect('/');

        } catch (error) {
            let message = error.message || error.error.message;
            update(message, error.errors || {})
        }
    }

}
