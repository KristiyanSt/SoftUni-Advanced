import { getDetails, updateFurniture } from '../data.js';
import { html, until } from '../lib.js';

const editTemplate = (itemPromise) => html`<div class="row space-top">
<div class="col-md-12">
    <h1>Edit Furniture</h1>
    <p>Please fill all fields.</p>
</div>
</div>
    ${until(itemPromise, html`<h2>Loading &hellip;`)} `;

const editForm = (item, onEdit, message, errors) => html`<form @submit=${onEdit}>
<div class="row space-top">
<div class="col-md-4">
${message
        ? html`<div class="form-group error">${message}`
        : ""}
<div class="form-group">
    <label class="form-control-label" for="new-make">Make</label>
    <input class=${'form-control' + (errors.make ? ' is-invalid' : "")} id="new-make" type="text" name="make" value=${item.make}>
</div>
<div class="form-group has-success">
    <label class="form-control-label" for="new-model">Model</label>
    <input class=${'form-control' + (errors.model ? ' is-invalid' : "")} id="new-model" type="text" name="model" value=${item.model}>
</div>
<div class="form-group has-danger">
    <label class="form-control-label" for="new-year">Year</label>
    <input class=${'form-control' + (errors.year ? ' is-invalid' : "")} id="new-year" type="number" name="year" value=${item.year}>
</div>
<div class="form-group">
    <label class="form-control-label" for="new-description">Description</label>
    <input class=${'form-control' + (errors.description ? ' is-invalid' : "")} id="new-description" type="text" name="description" value=${item.description}>
</div>
</div>
<div class="col-md-4">
<div class="form-group">
    <label class="form-control-label" for="new-price">Price</label>
    <input class=${'form-control' + (errors.price ? ' is-invalid' : "")} id="new-price" type="number" name="price" value=${item.price}>
</div>
<div class="form-group">
    <label class="form-control-label" for="new-image">Image</label>
    <input class=${'form-control' + (errors.img ? ' is-invalid' : "")} id="new-image" type="text" name="img" value=${item.img}>
</div>
<div class="form-group">
    <label class="form-control-label" for="new-material">Material (optional)</label>
    <input class="form-control" id="new-material" type="text" name="material" value=${item.material}>
</div>
<input type="submit" class="btn btn-info" value="Edit" />
</div>
</div>
</form>`;

export async function editPage(ctx) {
    const item = getDetails(ctx.params.id);
    update(item, undefined, {});

    async function update(item, errorMessage, errors) {
        ctx.renderView(editTemplate(loadItem(item, onEdit, errorMessage, errors)))

    }

    async function loadItem(item, onEdit, errorMessage, errors) {
        
        return editForm(await item, onEdit, errorMessage, errors);
    }

    async function onEdit(e) {
        e.preventDefault();
        let formData = new FormData(e.target);
        let formObj = [...formData.entries()].reduce((acc, [k, v]) => Object.assign(acc, { [k]: v }), {})
        let errors = filterData(formObj);

        try {
            if (Object.keys(errors).length > 0) {
                throw {
                    error: new Error('All fields must be filled!'),
                    errors
                }
            }

            await updateFurniture(ctx.params.id, formObj);
            ctx.page.redirect(`/details/${ctx.params.id}`)
        } catch (error) {
            let message = error.message || error.error.message;
            update(formObj, message, error.errors || {})
        }

    }
}
function filterData(formObj) {
    formObj.year = Number(formObj.year);

    formObj.price = formObj.price.trim() == ""
        ? -1
        : Number(formObj.price);

    let invalidFields = {};

    if (formObj.make.length < 4) {
        invalidFields.make = true;
    }
    if (formObj.model.length < 4) {
        invalidFields.model = true;
    }
    if (formObj.year < 1950 && fields.year > 2050) {
        invalidFields.year = true;
    }
    if (formObj.description.length < 10) {
        invalidFields.description = true;
    }
    if (formObj.price < 0) {
        invalidFields.price = true;
    }
    if (formObj.img == "") {
        invalidFields.img = true;
    }

    return invalidFields;
}