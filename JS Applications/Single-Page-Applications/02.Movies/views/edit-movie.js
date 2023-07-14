let editPage = undefined;
let main = undefined;

export function setupEdit(section,container){
    editPage = section;
    main = container;
}

export async function editView(){
    main.appendChild(editPage);
}