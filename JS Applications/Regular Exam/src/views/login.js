import { login } from '../data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const loginTemplate = (eventHandler) => html`
<section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit="${eventHandler}" class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
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
