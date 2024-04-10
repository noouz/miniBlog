const titleInp = document.querySelector('#title');
const dateInp = document.querySelector('#date');
const postInp = document.querySelector('#post');
const enterBtn = document.querySelector('.enter');
const main = document.querySelector('.main');
const userIcon = document.querySelector('.user-icon');
const userName = document.querySelector('.user-name a');
const logOutBtn = document.querySelector('.user-logOut');
const postIcon = document.querySelector('.userIcon ');

let userArr = [];
let arr = [];
let cmArr = [];
let id = arr.length;

//時間
const date = new Date();
const today = date.toISOString().split('T')[0]; //返回一个 ISO格式時間 2011-10-05T14:48:00.000Z
dateInp.value = today;

if (localStorage.getItem('postList')) { //取得JSON string
    arr = JSON.parse(localStorage.getItem('postList')) //轉換為JS可以處理的陣列/物件格式
    id = arr[arr.length - 1].id;
}

if (localStorage.getItem('nowUser')) { //取得JSON string
    userArr = JSON.parse(localStorage.getItem('nowUser')) //轉換為JS可以處理的陣列/物件格式
}

navOutput();
output(arr);

//新增文章
enterBtn.addEventListener('click', () => {
    let dateValue = dateInp.value;
    let titleValue = titleInp.value;
    let postValue = postInp.value;

    if (postValue !== '' && dateValue !== '' && titleValue !== '') {
        let addArr = {
            id: id + 1,
            title: titleValue,
            date: dateValue,
            content: postValue,
            comment: [],
        }
        arr.push(addArr);
        id = arr[arr.length - 1].id;
        titleInp.value = '';
        postInp.value = '';
    } else {
        alert('您尚未寫完文章!')
        return;
    }

    output(arr);
    // console.log(arr);

})

//新增留言
function addCallBack(id) {
    arr.map((item) => {
        if (item.id == id) {
            let post = document.querySelector(`.post:nth-child(${item.id})`);
            let cmInp = post.querySelector('input.comment-input');
            let cmValue = cmInp.value;
            if (cmValue !== '') {
                item.comment.push(cmValue);
                // cmArr = item.comment;
                cmInp.value = '';

                cmOutput(item.comment, item.id);
            }
        }
    });
    // console.log(id);
    if (arr.length === 0) {
        localStorage.clear();
    } else {
        //製作成JSON string，以利儲存至localStorage裡面
        const arrData = JSON.stringify(arr);
        //localStorage 存入數據
        localStorage.setItem('postList', arrData);
    }

}

//輸出nav
function navOutput() {
    userName.innerText = '';
    userIcon.innerHTML = '';
    userArr.forEach((user) => {
        // console.log(user[0].name);
        userName.innerText = user.name;
        userIcon.innerHTML +=`
            <a href="#">
                <img src=${user.icon} alt="icon"></img>
            </a>
        `
        postIcon.innerHTML = `
            <a href="#">
                <img src=${user.icon} alt="icon"></img>
            </a>
        `
    })
    
    // console.log(postIcon);
    
}


//輸出文章
function output(array) {
    if(arr.length === 0){
        return;
    };
    main.innerHTML = '';
    array.forEach((item) => {
        main.innerHTML += `
            <div class="post">
                <div class="article">
                    <h2>${item.title}</h2>
                    <span>${item.date}</span>
                    <p>${item.content}</p>
                </div>
                <ul class="comment">
                    <li class="comment-action">
                        <div class="icon">
                            <img src="${userArr[0].icon}" alt="icon">
                        </div>
                        <input type="text" name="comment" id="comment" class="comment-input" placeholder="回應這則文章">
                        <button type="button" class="cmEnter"  onclick = 'addCallBack(${item.id})'>送出</button>
                    </li>
                    <li class="comment-item">
                    </li>
                </ul>
            </div>
        `
        cmOutput(item.comment, item.id)
    });
    if (arr.length === 0) {
        localStorage.clear();
    } else {
        //製作成JSON string，以利儲存至localStorage裡面
        const arrData = JSON.stringify(arr);
        //localStorage 存入數據
        localStorage.setItem('postList', arrData);
    }
}

//輸出留言
function cmOutput(array, id) {
    let post = document.querySelector(`.post:nth-child(${id})`);
    let commentList = post.querySelector('li.comment-item');
    commentList.innerHTML = '';
    array.forEach((item) => {
        commentList.innerHTML += `
            <div class="comment-item-text">
                <div class="icon">
                    <img src=${userArr[0].icon} alt="icon">
                </div>
                <span>${item}</span>
            </div>
        `
    })
}

//登出
logOutBtn.addEventListener('click',() =>{
    localStorage.clear();
    window.location.href = './logIn.html';
})
































// if () {
//     const cmEnterBtn = document.querySelector('.comment-action .cmEnter');

//     cmEnterBtn.addEventListener('click', () => {
//         let cmInp = document.querySelector('input#comment');
//         let cmValue = cmInp.value;

//         if (cmValue != '') {
//             let cmAddArr = {
//                 id: cmId + 1,
//                 text: cmValue,
//             }
//             cmArr.push(cmAddArr);
//             cmId = cmArr[cmArr.length - 1].id;
//             cmValue = '';
//         }
//         cmOutput(cmArr)
//     })
// }