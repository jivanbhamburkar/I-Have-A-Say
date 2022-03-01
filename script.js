//Collection of Elements
const input = document.getElementById("commentMain");
const output = document.getElementById("out");
const add = document.getElementById("add");



window.onload = function setTemplate() {
  document.getElementById("out").innerHTML = localStorage.getItem("template");
};
// localStorage.clear();
add.addEventListener("click", function (ev) {
  if (input.value) {
    addComment(ev);
  }
});

// function for adding main Comment
function addComment(ev) {
    //Create Element
    const div = document.createElement("div");
    const para = document.createElement("p");
    var replyBut = document.createElement("button");
    var likeBut = document.createElement("button");
    var delBut = document.createElement("button");

    //Appending
    para.innerHTML = input.value;
    div.appendChild(para);
    output.appendChild(div);

    //Set ID
    para.setAttribute("id", "mainComment");
    // div.setAttribute("id", "mainCommentCont");
    replyBut.setAttribute("class", "allReply");

    //Div Styling
    div.style.backgroundColor = "rgb(3, 65, 60, 0.32)";
    div.style.border = "rgb(86, 86, 131) solid 1px";
    div.style.margin = "10px";
    div.style.borderRadius = "5px";
    div.style.width = "fit-content";
    // div.style.width = "max-content";
    div.style.flexWrap;

    //Buttons inner text
    replyBut.innerHTML = "Reply";
    likeBut.innerHTML = "Like";
    delBut.innerHTML = "Delete";

    //buttons append
    ev.target.parentElement.appendChild(div);
    div.appendChild(replyBut);
    div.appendChild(likeBut);
    div.appendChild(delBut);

    //Button EventListner
    replyBut.addEventListener("click", function (e) {
      reply(e);
    });
    likeBut.addEventListener("click", function (e) {
      like(e);
    });
    delBut.addEventListener("click", function (e) {
      deleteComment(e);
    });

    //Emptying TextArea
    input.value = "";
    var count = 0;

    function like() {
      count++;
      likeBut.innerHTML = count + " likes";
    }
  setOnLocalStorage();
}

function addReply(e) {
  
    //Create Element child Comment
    const div = document.createElement("div");
    const para = document.createElement("p");
    var replyBut = document.createElement("button");
    var likeBut = document.createElement("button");
    var delBut = document.createElement("button");

    //appending 
    para.innerHTML = e.target.previousSibling.value;
    div.appendChild(para);
    output.appendChild(div);

    //Div Styling

    div.style.borderLeft = "gold solid 1px";
    div.style.marginLeft = "20px";
    div.style.borderRadius = "10px";
    div.style.width = "auto";
    e.target.parentElement.style.width = "auto";

    replyBut.setAttribute("class", "allReply");

    //Buttons inner text
    replyBut.innerHTML = "Reply";
    likeBut.innerHTML = "Like";
    delBut.innerHTML = "Delete";

    //buttons append
    e.target.parentElement.appendChild(div);
    div.appendChild(replyBut);
    div.appendChild(likeBut);
    div.appendChild(delBut);

    //Button EventListner
    replyBut.addEventListener("click", function (e) {
      reply(e);
    });
    likeBut.addEventListener("click", function (e) {
      like(e);
    });
    delBut.addEventListener("click", function (e) {
      deleteComment(e);
    });

    //Removing TextArea
    e.target.nextElementSibling.remove();
    e.target.previousSibling.remove();
    e.target.remove();

    //Like Function
    var count = 0;
    function like() {
      count++;
      likeBut.innerHTML = count + " likes";
    }
  
  setOnLocalStorage();
}

function cancel(e) {
  e.target.parentElement.remove();
  setOnLocalStorage();
}

function deleteComment(e) {
  e.target.parentElement.remove();  
    enableReply();  
    setOnLocalStorage();
}


//Managing Reply Buttons
function disableReply(){
  const allReply = document.querySelectorAll(".allReply");
  allReply.forEach(ele => {ele.disabled = true}) 
}
function enableReply(){
  allReply = document.querySelectorAll(".allReply");
  allReply.forEach(ele => {ele.disabled = false})
}

function reply(e) {
  disableReply();
  const reply=  e.target;
  reply.setAttribute("id", "reply");
  const replyDiv = document.createElement("div");
  const commentReply = document.createElement("textarea");
  const addButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  
  addButton.innerText = "Add";
  cancelButton.innerText = "Cancel";
  replyDiv.appendChild(commentReply);
  replyDiv.appendChild(addButton);
  replyDiv.appendChild(cancelButton);
  e.target.parentElement.appendChild(replyDiv);

  addButton.addEventListener("click", function (e) {
    if (e.target.previousSibling.value) {
    addReply(e);
    enableReply();
    }
  });
  cancelButton.addEventListener("click", function (e) {
    cancel(e);
    enableReply();
  });
  setOnLocalStorage();
}

function setOnLocalStorage() {
  localStorage.setItem("template", document.getElementById("out").innerHTML);
}

