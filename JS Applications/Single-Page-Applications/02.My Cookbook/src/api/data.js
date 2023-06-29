import api from '../api/api.js';

export async function getRecipes(){
    return api.get('data/recipes');
}
export async function getFullRecipe(id){
   return api.get(`data/recipes/${id}`);
}
export async function refactorRecipe(id, body){
    return api.put('data/recipes/' + id, body);
}
export async function deleteRecipeReq(id){
    return api.del('data/recipes/' + id);
}
