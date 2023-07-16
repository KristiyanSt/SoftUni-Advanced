import { login } from '../data.js';
import {html} from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const loginTemplate = (eventHandler) => html`
  <section id="loginPage">
            <form class="loginForm" @submit=${eventHandler}>
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
</section>`;

export async function loginPage(ctx) {
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));
    async function onLogin(data) {
        const params = Object.values(data);
        if(params.some(v => v.trim() == "")){
            alert('All fields must be filled!');
        }else{
            await login(data);
            ctx.updateNav();
            ctx.page.redirect('/');
        }
    }
}