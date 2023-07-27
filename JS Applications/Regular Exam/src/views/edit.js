import { editFact, readFactById } from '../data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (fact, eventHandler) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${eventHandler} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${fact.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${fact.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${fact.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${fact.moreInfo}
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
</section>`;

export async function editPage(ctx) {
  const fact = await readFactById(ctx.params.id);
  console.log(fact);
  update(fact);

  function update(fact) {
    ctx.render(editTemplate(fact, createSubmitHandler(onEdit)));
  }

  async function onEdit(data) {
    if (Object.values(data).some(v => v.trim() == "")) {
      alert('All fields must be filled!');
    } else {
      const newData = {};
      for (const key in data) {
        if(key == 'image-url'){
          newData.imageUrl = data[key];
        }else if(key == 'additional-info') {
          newData.moreInfo = data[key];
        }else {
          newData[key] = data[key];
        }
      }
      await editFact(fact._id, newData);
      ctx.page.redirect(`/details/${fact._id}`);
    }
  }
}