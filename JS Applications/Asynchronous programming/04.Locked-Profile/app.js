function lockedProfile() {
    let templateProfile = document.querySelector('div[class="profile"]')
    templateProfile.remove();
    (async () => {
        let response = await fetch('http://localhost:3030/jsonstore/advanced/profiles');
        let profilesInfo = await response.json();
        let keys = Object.keys(profilesInfo);
        for(let i = 0; i < keys.length;i++){
            let currentProfile = profilesInfo[keys[i]];
            createProfile(currentProfile.username,currentProfile.email,currentProfile.age,i+1);
        }
    })();

    function createProfile(username,email,age,index){
        let main = document.getElementById('main');

        let profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        let img = document.createElement('img');
        img.classList.add('userIcon');
        img.src = "./iconProfile2.png";

        let lockLabel = document.createElement('label');
        lockLabel.textContent = "Lock";

        let lockInput = document.createElement('input');
        lockInput.type = 'radio';
        lockInput.name = `user${index}Locked`;
        lockInput.value = 'lock';
        lockInput.checked = true;

        let unlockLabel = document.createElement('label');
        unlockLabel.textContent = "Unlock";

        let unlockInput = document.createElement('input');
        unlockInput.type = 'radio';
        unlockInput.name = `user${index}Locked`;
        unlockInput.value = 'unlock';

        let br = document.createElement('br');

        let hr = document.createElement('hr');

        let usernameLabel = document.createElement('label');
        usernameLabel.textContent = "Username:"

        let usernameValueInput = document.createElement('input');
        usernameValueInput.type = 'text';
        usernameValueInput.value = username;
        usernameValueInput.name = `user${index}Username`;
        usernameValueInput.disabled = true;
        usernameValueInput.readOnly = true;

        let hiddenFieldsDiv = document.createElement('div');
        hiddenFieldsDiv.id = `user${index}HiddenFields`;
        hiddenFieldsDiv.style.display = 'none';

        let hiddenHr = document.createElement('hr');

        let emailLabel = document.createElement('label');
        emailLabel.textContent = 'Email:';

        let emailValueInput = document.createElement('input');
        emailValueInput.type = 'email';
        emailValueInput.value = email;
        emailValueInput.name = `user${index}Email`;
        emailValueInput.disabled = true;
        emailValueInput.readOnly = true;

        let ageLabel = document.createElement('label');
        ageLabel.textContent = 'Age:';
        
        let ageValueInput = document.createElement('input');
        ageValueInput.type = 'email';
        ageValueInput.value = age;
        ageValueInput.name = `user${index}Age`;
        ageValueInput.disabled = true;
        ageValueInput.readOnly = true;

        let button = document.createElement('button');
        button.textContent = 'Show more';
        button.addEventListener('click',showHiddenDiv)

        hiddenFieldsDiv.appendChild(hiddenHr);
        hiddenFieldsDiv.appendChild(emailLabel);
        hiddenFieldsDiv.appendChild(emailValueInput);
        hiddenFieldsDiv.appendChild(ageLabel);
        hiddenFieldsDiv.appendChild(ageValueInput);

        profileDiv.appendChild(img)
        profileDiv.appendChild(lockLabel)
        profileDiv.appendChild(lockInput)
        profileDiv.appendChild(unlockLabel)
        profileDiv.appendChild(unlockInput)
        profileDiv.appendChild(br)
        profileDiv.appendChild(hr)
        profileDiv.appendChild(usernameLabel)
        profileDiv.appendChild(usernameValueInput)
        profileDiv.appendChild(hiddenFieldsDiv)
        profileDiv.appendChild(button)

        main.appendChild(profileDiv);
    }
    function showHiddenDiv(e){
        let divProfile = e.target.parentElement;
        let lockedInput = divProfile.querySelector('input');
        if(!lockedInput.checked){
            let hiddenDiv = divProfile.querySelector('div');
            if(hiddenDiv.style.display == 'block'){
                e.target.textContent = 'Show More';
                hiddenDiv.style.display = 'none'
            }else{
                e.target.textContent = 'Hide it';
                hiddenDiv.style.display = 'block';
            }
        }
    }
}