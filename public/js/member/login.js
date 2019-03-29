window.addEventListener('load', ()=>{

    let loginBox = document.querySelector('#login-box');
    let loginForm = loginBox.querySelector('.login-form');

    let inputId = loginForm.querySelector('input[name="id"]');
    let inputPassword = loginForm.querySelector('input[name="password"]')

    let loginButton = loginForm.querySelector('#login-button');
    let warningBox = loginForm.querySelector('.warning-box');

    loginForm.onsubmit = (e)=>{
        return false;
    }

    loginButton.onclick = (e)=>{
        let idValue = inputId.value;
        let passwordValue = inputPassword.value;

        let idCheck = regexCheck(memberRegex.id, idValue);
        let passwordCheck = regexCheck(memberRegex.password, passwordValue);

        let params = {
            id : idValue,
            password : passwordValue,
        };

        if(!regexAllCheck(idCheck, passwordCheck)){
            warningBox.classList.remove('hidden');
            return;
        }
            
        sendPostRequest("/member/login", params, true, (e) => {
            if(e.result){
                location.href = '/';
            } else{
                warningBox.classList.remove('hidden');            
                return;
            }
        });	
    }
});