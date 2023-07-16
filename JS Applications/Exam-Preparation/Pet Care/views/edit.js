import { editPet, getPet } from '../data.js';
import { html } from '../lib.js';
import { createSubmitHandler } from '../utils.js';

const editTemplate = (pet, eventHandler) => html`<section id="editPage">
<form class="editForm" @submit=${eventHandler}>
        <img src="../images/editpage-dog.jpg">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${pet.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${pet.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${pet.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${pet.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${pet.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const pet = await getPet(id);

    update();

    function update() {
        ctx.render(editTemplate(pet, createSubmitHandler(onEdit)));

    }
    async function onEdit(data) {
        if(Object.values(data).some(v => v.trim() == "")){
            alert('All fields must be filled!');
        }else {
            let a  = await editPet(id, data);
            ctx.page.redirect(`/details/${id}`);
        }
    }
}