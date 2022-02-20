function SignUp(){
    event.preventDefault();
    var email=document.getElementById('signupEmail').value;
    var username=document.getElementById('signupUsername').value;
    var password= document.getElementById('signupPassword').value;

    var user= {
        email:email,
        username:username,
        password:password,
    };

    var json=JSON.stringify(user);
    localStorage.setItem(username,json);
    
    let loginForm = document.getElementById("login");
    let createAccountForm = document.getElementById("createAccount");

    loginForm.classList.remove("form--hidden");
    createAccountForm.classList.add("form--hidden");
    document.getElementById("signupUsername").value="";
    document.getElementById("signupEmail").value="";
    document.getElementById("signupPassword").value="";
    document.getElementById("signupPasswordConfirmation").value="";

}

function LogIn(){
    for (var i = 0; i < localStorage.length; i++){

        if(localStorage.key(i)==document.getElementById('username').value)
        {
            if(JSON.parse(localStorage.getItem(localStorage.key(i))).password==document.getElementById('password').value)
            {
                localStorage.setItem("connected",localStorage.key(i))
                window.location.href="event.html"
            }
            
        }
    }
}

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

   /*loginForm.addEventListener("submit", e => {
        e.preventDefault();

        // Perform your AJAX/Fetch login

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });*/


var booluser=true;
var boolemail=true;
var boolpass2=true;

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("keyup", e => {
            booluser=true;
            boolemail=true;
            boolpass2=true;
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 4 ) {
                setInputError(inputElement, "Le nom d'utilisateur doit contenir 4 caractères.");
                booluser=false;
                document.getElementById("jesuislebutton").setAttribute("disabled","");
            }

            if (e.target.id === "signupEmail" && e.target.value.length < 0 ) {
                setInputError(inputElement, "Champ obligatoire.");
                boolemail=false;
                document.getElementById("jesuislebutton").setAttribute("disabled","");

            }
            
            
            if(e.target.id === "signupPasswordConfirmation" && e.target.value.length > 0 && document.getElementById("signupPasswordConfirmation").value!=document.getElementById("signupPassword").value)
            {
                setInputError(inputElement, "Les mots de passe ne sont pas identiques.");
                boolpass2=false;
                document.getElementById("jesuislebutton").setAttribute("disabled","");

            }
            if(booluser && boolpass2 && boolemail && document.getElementById("signupUsername").value!="" && document.getElementById("signupPasswordConfirmation").value!="" && document.getElementById("signupPassword").value!="" && document.getElementById("signupEmail").value!="")
            {
                clearInputError(inputElement);
                document.getElementById("jesuislebutton").removeAttribute("disabled");
            }

        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
}); 