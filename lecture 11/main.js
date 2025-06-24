const user_img = document.getElementById("user-img")
const user_name = document.getElementById("user-name")
const user_email = document.getElementById("user-email")
const user_location = document.getElementById("user-location")
const refresh_btn = document.getElementById("refresh-btn")

function displayUser(user){
    user_img.src = user.picture.large
    user_name.textContent = `${user.name.first} ${user.name.last}`
    user_email.textContent = user.email
    user_location.textContent = `${user.location.city}, ${user.location.state}`
}
async function fetchUser(){
    try {
        let res = await axios.get("https://randomuser.me/api/")
        const user = res.data.results[0]
        localStorage.setItem("savedUser", JSON.stringify(user))
        displayUser(user)
    }
    catch(error){
        console.log("Error fetching user : ", error)
    }
}

document.addEventListener("DOMContentLoaded", ()=>{
    const savedUser = localStorage.getItem("savedUser");

    if(savedUser){
        displayUser(JSON.parse(savedUser))
    }
    else{
        fetchUser()
    }
})

refresh_btn.addEventListener("click", fetchUser)
