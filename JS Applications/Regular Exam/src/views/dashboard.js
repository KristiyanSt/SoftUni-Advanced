import { getAll } from '../data.js';
import {html} from '../lib.js';

const dashboardTemplate = (facts) => html`
<h2>Fun Facts</h2>
        ${facts.length > 0 ? sectionTemplate(facts) : noFactsTemplate()}`;

const sectionTemplate = (facts) => html`
<section id="dashboard">
          <!-- Display a div with information about every post (if any)-->
          ${facts.map(factTemplate)}
</section>`;

const factTemplate = (fact) => html`
<div class="fact">
            <img src=${fact.imageUrl} alt="example1" />
            <h3 class="category">${fact.category}</h3>
            <p class="description">${fact.description}</p>
            <a class="details-btn" href="/details/${fact._id}">More Info</a>
</div>`;

const noFactsTemplate = () => html`<h2>No Fun Facts yet.</h2>`;

export async function dashboardPage(ctx) {
  const facts = await getAll();
  ctx.render(dashboardTemplate(facts));
}