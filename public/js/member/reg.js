let duplicatedState = {
    id : false,
    nickname : false,
    email : false
}

let validationState = {
    id : false,
    nickname : false,
    email : false,
    password : false,
    password2 : false
}

let subText = {
    id : {
        validation : '1~15자의 영문, 숫자만 사용 가능합니다.',
        duplicated : '아이디가 중복되었습니다.',
        complete : '사용 가능합니다.'
    },
    password : {
        validation : '6~20자 영문, 숫자를 포함해 주세요.',
        complete : '사용 가능합니다.'
    },
    password2 : {
        validation : '비밀번호가 다릅니다.',
        complete : '비밀번호가 일치합니다.'
    },
    nickname : {
        validation : '1~15자의 영문, 숫자, 한글만 사용 가능합니다.',
        duplicated : '닉네임이 중복되었습니다.',
        complete : '사용 가능합니다.'
    },
    email : {
        validation : '이메일 형식이 아닙니다.',
        duplicated : '이메일이 중복되었습니다.',
        complete : '사용 가능합니다.'
    },
}

let duplicatedChecker = (field, value) => {
    let params = { value : value };
    let result = false;
    sendGetRequest("/member/duplicated/"+field, params, false, (e) => {
        result = e.result;
    });	
    return result;
};

let addWarning = (e) => {
    e.classList.add('warning');
}

let removeWarning = (e) => {
    e.classList.remove('warning');
}


window.addEventListener('load', ()=>{

    let regBox = document.querySelector('#reg-box');
    let memberForm = regBox.querySelector('.member-form');

    let inputId = memberForm.querySelector('input[name="id"]');
    let inputPassword = memberForm.querySelector('input[name="password"]');
    let inputPassword2 = memberForm.querySelector('input[name="password2"]');
    let inputEmail = memberForm.querySelector('input[name="email"]');
    let inputNickname = memberForm.querySelector('input[name="nickname"]');

    //필드 이름
    let nameId = memberForm.querySelector('.name-id');
    let namePassword = memberForm.querySelector('.name-password');
    let namePassword2 = memberForm.querySelector('.name-password2');
    let nameNickname = memberForm.querySelector('.name-nickname');
    let nameEmail = memberForm.querySelector('.name-email');

    //필드 설명
    let subId = memberForm.querySelector('.sub-id');
    let subPassword = memberForm.querySelector('.sub-password');
    let subPassword2 = memberForm.querySelector('.sub-password2');
    let subNickname = memberForm.querySelector('.sub-nickname');
    let subEmail = memberForm.querySelector('.sub-email');

    let regButton = memberForm.querySelector('#reg-button');

    inputId.onblur = (e)=>{
        let idValue = inputId.value;
        let idCheck = regexCheck(memberRegex.id, idValue);
        if(idCheck){
            // 아이디 중복 체크
            let result = duplicatedChecker('id', idValue);
            validationState['id'] = true;
            if(!result){ // 중복되지 않으면
                duplicatedState['id'] = true;
                removeWarning(nameId);
                removeWarning(subId);
                subId.textContent = subText.id.complete;
            }else {
                duplicatedState['id'] = false;
                addWarning(nameId);
                addWarning(subId);
                subId.textContent = subText.id.duplicated;
            }
        } else{
            // 형식에 맞지 않는다.
            validationState['id'] = false;
            duplicatedState['id'] = false;
            addWarning(nameId);
            addWarning(subId);
            subId.textContent = subText.id.validation;
        }
    };

    inputPassword.onblur = (e)=>{
        let passwordValue = inputPassword.value;
        let passwordCheck = regexCheck(memberRegex.password, passwordValue);
        if(passwordCheck){
            // 형식에 맞다.
            validationState['password'] = true;
            removeWarning(namePassword);
            removeWarning(subPassword);
            subPassword.textContent = subText.password.complete;
        } else{
            // 형식에 맞지 않는다.
            validationState['password'] = false;
            addWarning(namePassword);
            addWarning(subPassword);
            subPassword.textContent = subText.password.validation;
        }
        inputPassword2.onblur();
    };

    inputPassword2.onblur = (e)=>{
        let passwordValue = inputPassword.value;
        let passwordValue2 = inputPassword2.value;
        // 형식에 맞다.                    
        if(passwordValue == passwordValue2){
            validationState['password2'] = true;
            removeWarning(namePassword2);
            removeWarning(subPassword2);
            subPassword2.textContent = subText.password2.complete;
        } else{
            // 형식에 맞지 않는다.
            validationState['password2'] = false;
            addWarning(namePassword2);
            addWarning(subPassword2);
            subPassword2.textContent = subText.password2.validation;
        }
    };

    inputEmail.onblur = (e)=>{
        let emailValue = inputEmail.value;
        let emailCheck = regexCheck(memberRegex.email, emailValue);
        if(emailCheck){
            // 닉네임 중복 체크
            let result = duplicatedChecker('email', emailValue);
            validationState['email'] = true;
            if(!result){ // 중복되지 않으면
                duplicatedState['email'] = true;
                removeWarning(nameEmail);
                removeWarning(subEmail);
                subEmail.textContent = subText.email.complete;
            }else {
                duplicatedState['email'] = false;
                addWarning(nameEmail);
                addWarning(subEmail);
                subEmail.textContent = subText.email.duplicated;
            }
        } else{
            // 형식에 맞지 않는다.
            validationState['email'] = false;
            duplicatedState['email'] = false;
            addWarning(nameEmail);
            addWarning(subEmail);
            subEmail.textContent = subText.email.validation;
        }
    };

    inputNickname.onblur = (e)=>{
        let nicknameValue = inputNickname.value;
        let nicknameCheck = regexCheck(memberRegex.nickname, nicknameValue);
        if(nicknameCheck){
            // 아이디 중복 체크
            let result = duplicatedChecker('nickname', nicknameValue);
            validationState['nickname'] = true;
            if(!result){ // 중복되지 않으면
                duplicatedState['nickname'] = true;
                removeWarning(nameNickname);
                removeWarning(subNickname);
                subNickname.textContent = subText.nickname.complete;
            }else {
                duplicatedState['nickname'] = false;
                addWarning(nameNickname);
                addWarning(subNickname);
                subNickname.textContent = subText.nickname.duplicated;
            }
        } else{
            // 형식에 맞지 않는다.
            validationState['nickname'] = false;
            duplicatedState['nickname'] = false;
            addWarning(nameNickname);
            addWarning(subNickname);
            subNickname.textContent = subText.nickname.validation;
        }
    };

    memberForm.onsubmit = (e)=>{
        return false;
    }

    regButton.onclick = (e)=>{

        let idValue = inputId.value;
        let passwordValue = inputPassword.value;
        let emailValue = inputEmail.value;
        let nicknameValue = inputNickname.value;

        var params = {
            id : idValue,
            password : passwordValue,
            email : emailValue,
            nickname : nicknameValue,
        };

        if(!regexAllCheck(validationState, duplicatedState)){
            return;
        }

        sendPostRequest("/member/reg", params, true, function(r){
            if(r.result){
                location.href = '/member/complete';
            } else {
                alert('서버에 문제가 있습니다. 죄송합니다.')
            }
        });

    }

});