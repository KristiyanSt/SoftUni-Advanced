import { deleteRecipeReq } from "../api/data.js";

export async function deleteRecipe(context, id, recipeName){
    let confirmMessage = confirm(`Are you sure you want to delete ${recipeName}?`);
    
    if(confirmMessage){
        await deleteRecipeReq(id);
        context.goto('/catalog');
    }
}