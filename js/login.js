const login = (event) =>{
    event.preventDefault()
    email = document.getElementById("login_email").value.trim()
    password = document.getElementById("login_password").value.trim()

    if (!email || !password){
        alert("vui lòng nhập đầy dủ thông tin")
    }

    let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : { }

    let storedUser = users[email]

    if (storedUser & storedUser.email === email & storedUser.password === password){
        alert("Đăng nhập thành công")
        window.location.href = "./index.html"
    } else{
        alert9("Email hoặc mật khẩu bị sai")
    }

}

document.getElementById("login_form").addEventListener("submit", login)