import { createFact } from '../data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const createTemplate = (eventHandler) => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${eventHandler} class="create-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
</section>`;

export async function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {

    if (Object.values(data).some(v => v.trim() == "")) {
      alert('All fields must be filled!');
    } else {
      await createFact(
        {
          category: data.category,
          imageUrl: data['image-url'],
          description: data.description,
          moreInfo: data['additional-info']
        }
      );
      ctx.page.redirect('/dashboard');
    }
  }
}