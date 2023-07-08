import { createFurniture } from '../data.js';
import { html, nothing } from '../lib.js';

const createItemTemplate = (onCreate, validFields, isFirst) => html` <div class="row space-top">
<div class="col-md-12">
    <h1>Create New Furniture</h1>
    ${isFirst 
    ? ""
    : Object.keys(validFields).length <= 5 
        ? html`<p class="error">Please fill all fields.</p>`
        : nothing }

</div>
</div>
<form @submit=${onCreate}>
<div class="row space-top">
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-make">Make</label>
            <input class=${"form-control" + (isFirst ? "" : validFields.make ? ' is-valid' : ' is-invalid')} id="new-make" type="text" name="make">
        </div>
        <div class="form-group has-success">
            <label class="form-control-label" for="new-model">Model</label>
            <input class=${"form-control" + (isFirst ? "" : validFields.model ? ' is-valid' : ' is-invalid')} id="new-model" type="text" name="model">
        </div>
        <div class="form-group has-danger">
            <label class="form-control-label" for="new-year">Year</label>
            <input class=${"form-control" + (isFirst ? "" : validFields.year ? ' is-valid' : ' is-invalid')} id="new-year" type="number" name="year">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-description">Description</label>
            <input class=${"form-control" + (isFirst ? "" : validFields.description ? ' is-valid' : ' is-invalid')} id="new-description" type="text" name="description">
        </div>
    </div>
    <div class="col-md-4">
        <div class="form-group">
            <label class="form-control-label" for="new-price">Price</label>
            <input class=${"form-control" + (isFirst ? "" : validFields.price ? ' is-valid' : ' is-invalid')} id="new-price" type="number" name="price">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-image">Image</label>
            <input class=${"form-control" + (isFirst ? "" : validFields.img ? ' is-valid' : ' is-invalid')} id="new-image" type="text" name="img">
        </div>
        <div class="form-group">
            <label class="form-control-label" for="new-material">Material (optional)</label>
            <input class="form-control" id="new-material" type="text" name="material">
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
    </div>
</div>
</form>`

export async function createPage(ctx){
    update(onCreate, {}, true);

    async function onCreate(e){
        e.preventDefault();
    
        let formData = new FormData(e.target);
        let fields = [...formData.entries()].reduce((acc,[k,v]) => Object.assign(acc,{[k]:v}), {});
        let validFields = validateFields(fields);
    
        if(Object.keys(validFields).length <= 5){
            update(onCreate, validFields);
        }else{
            let item = await createFurniture(fields);
            ctx.page.redirect(`/details/${item._id}`);
        }
        
    }
    function update(onCreate,validFields, isFirst) {
        ctx.renderView(createItemTemplate(onCreate,validFields, isFirst))
    }
}

function validateFields(fields) {
    fields.year = Number(fields.year);

    fields.price = fields.price.trim() == "" 
    ? -1
    : Number(fields.price);

    let validFields = {};

    if(fields.make.length >= 4 ){
        validFields.make = fields.make;
    }
    if(fields.model.length >= 4){
        validFields.model = fields.model;
    }
    if(fields.year>=1950 && fields.year <= 2050){
        validFields.year = fields.year;
    }
    if(fields.description.length >=10){
        validFields.description = fields.description;
    }
    if(fields.price >= 0 ){
        validFields.price = fields.price;
    }
    if(fields.img != ""){
        validFields.img = fields.img;
    }

    return validFields;
}