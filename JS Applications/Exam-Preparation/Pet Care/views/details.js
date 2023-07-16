import { deletePet, donate, getDonationCount, getPet, getUserDonation } from '../data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (pet, count, isOwner,onDonate, donated, onDelete) => html`
 <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${count}$</h4>
                    </div>
                    <div class="actionBtn">
                        ${isOwner != null                   
                        ? isOwner ? html`<a href="/edit/${pet._id}" class="edit">Edit</a>
                                    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` 
                                    : donated == 1 ? "" : html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
                        : "" } 
                    </div>
                </div>
            </div>
</section>`;



export async function detailsPage(ctx) {
    let isOwner = null;
    let donated = null;

    const user = getUserData();
    const [pet, count] = await Promise.all([
        getPet(ctx.params.id),
        getDonationCount(ctx.params.id)]);
    if(user) {
        isOwner = user._id == pet._ownerId
        donated = await getUserDonation(pet._id, user._id);
    }

    update(count, donated);

    async function update(count, donated) {
        count = Number(count) * 100;
        ctx.render(detailsTemplate(pet, count, isOwner,onDonate, donated, onDelete));
    }
    async function onDonate() {
        await donate(pet._id);
        const count = await getDonationCount(ctx.params.id);
        update(count, 1);
    }
    async function onDelete() {
        let choice = confirm("Are you sure you want to delete this article?");

        if(choice){
            await deletePet(ctx.params.id);
            ctx.page.redirect('/');
        }
    }
}