import { register } from "../data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../utils.js";

const registerTemplate = (eventHandler) => html`
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit="${eventHandler}" class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
</section>`;

export async function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  async function onRegister(data) {
    const params = Object.values(data);

    if (params.some(v => v.trim() == "")) {

      alert('All fields must be filled!');
    } else if(data.password != data['re-password']) {

      alert('Passwords do not match!');
    } else{

      await register({email: data.email, password: data.password});
      ctx.updateNav();
      ctx.page.redirect('/');
    }
  }
}