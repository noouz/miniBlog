const accountInp = document.querySelector('input#email');
const passwordInp = document.querySelector('input#password');
const logInBtn = document.querySelector('.log-in');

let userArr = [];
let nowUser = [];
// let id = userArr.length;

userArr = [
    {
        id: 1,
        name: 'Wilson',
        account: 'q123456@gmail.com',
        password: 'q123456',
        icon: 'https://1.bp.blogspot.com/-2XYMxsVEAR8/Xxbj_Yv38aI/AAAAAAABaRg/bi7C9P3mdmQHQnct34swmKgmMs-_tMMtACNcBGAsYHQ/s400/animal_character_hamster.png'
    },
    {
        id: 2,
        name: 'Selly',
        account: 'a741256@gmail.com',
        password: 'a741256',
        icon: 'https://1.bp.blogspot.com/-zyvvuefJLQM/XkZdUNDP2UI/AAAAAAABXWU/zElc5fj6l2AnonYZne8LUzbltyzUWK0oQCNcBGAsYHQ/s400/yumekawa_animal_azarashi.png'
    },
    {
        id: 3,
        name: 'Meiy',
        account: 'z998877@gmail.com',
        password: 'z998877',
        icon: 'https://1.bp.blogspot.com/-eFc2ORdtVn4/XfMOBNwimmI/AAAAAAABWtg/cSglyPpy7ksssQ_jI-tw7Blt0tcYu9CmQCNcBGAsYHQ/s400/animal_character_nezumi_cheese.png'
    },
]

console.log(userArr);

logInBtn.addEventListener('click', () => {
    let acValue = accountInp.value;
    let psValue = passwordInp.value;

    if (acValue !== '' && psValue !== '') {
        //驗證帳密
        let confirm = userArr.filter(user => user.account == acValue && user.password == psValue)
        console.log(confirm.length);

        if (confirm.length !== 0) {
            nowUser = confirm;
            const userData = JSON.stringify(nowUser);
            localStorage.setItem('nowUser', userData);

            window.location.href = './index.html';
        } else {
            alert('登入失敗，請確認帳密是否正確');
            return;
        }
        accountInp.value = '';
        passwordInp.value = '';
    }

})

