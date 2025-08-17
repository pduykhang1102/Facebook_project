const register = (event) =>{
    event.preventDefault()
    let name = document.getElementById("name").value.trim()
    let email = document.getElementById("email").value.trim()
    let password = document.getElementById("password").value.trim()
    let confirm_password = document.getElementById("confirm_password").value.trim()

    const lowerCase = /[a-z]/g
    const upperCase = /[A-Z]/g
    const number = /[0-9]/g

    if (!name || !email || !password || !confirm_password){
        alert("vui lòng nhập đầy đủ thông tin")
        return
    }

    if (password !== confirm_password){
        alert("Confirm password bị sai")
        return
    }   

    if (password.length < 7){
        alert("password cần gồm ít nhất 7 kí tự")
        return
    }

    if (!password.match(lowerCase)){
        alert("Password cần gồm ít nhất một chữ thường")
        return
    }

    if (!password.match(upperCase)){
        alert("password cần gồm ít nhất một chữ hoa")
        return
    }

    if (!password.match(number)){
        alert("password cần gồm ít nhất một con số ")
        return
    }

    let user = {
        name: name,
        email: email,
        password: password,
    }

    let users = localStorage.getItem("users")


    if(users){
        users = JSON.parse(localStorage.getItem('users'))
    } else{
        users = { }
    }

    if (users[email]){
        alert("Email đã được đăng kí")
    } else {
        users[email] = user
        localStorage.setItem("users", JSON.stringify(users))
        alert("Đăng kí thành công")

    }
} 


document.getElementById("signup_form").addEventListener("submit", register)
