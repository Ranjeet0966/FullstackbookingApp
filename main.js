const form = document.getElementById("form");
const submitbtn = document.getElementById("submit");
const name1 = document.getElementById("name");
const email = document.getElementById("email");
const number = document.getElementById("number");
const date = document.getElementById("date");
const time = document.getElementById("time");
const list = document.getElementById("list");
const id = document.getElementById("userid");

form.addEventListener("submit", async function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    e.preventDefault();

    let myobj = {
      name: name1.value,
      email: email.value,
      number: number.value,
      date: date.value,
      time: time.value,
    };

    const res = await axios
      .post("http://localhost:4001/add-user", myobj)
      .catch((err) => console.log(err));
    if (res) {
      myobj.id = res.data;
    }
    // let myobj1 = JSON.stringify(myobj);
    // localStorage.setItem(email.value, myobj1);
    showItems(myobj);
    name1.value = "";
    email.value = "";
    number.value = "";
    date.value = "";
    time.value = "";
  }
  //form.classList.add("was-validated");
});

function showItems(obj) {
  let li = document.createElement("li");
  li.className = "list-group-item";
  let deletebtn = document.createElement("button");
  deletebtn.className = "btn btn-danger btn-sm float-right delete";
  deletebtn.appendChild(document.createTextNode("X"));
  const editbtn = document.createElement("button");
  editbtn.className = "btn btn-warning btn-sm float-right edit";
  editbtn.textContent = "E";

  li.appendChild(
    document.createTextNode(
      obj.name +
        "   " +
        obj.email +
        "   " +
        obj.number +
        "   " +
        obj.date +
        "   " +
        obj.time
    )
  );
  deletebtn.onclick = async () => {
    let id = obj.id;
    list.removeChild(li);
    await axios
      .post(`http://localhost:4001/delete`, { id })
      .catch((err) => console.log(err));

    // localStorage.removeItem(obj.email);
  };
  editbtn.onclick = async () => {
    name1.value = obj.name;
    email.value = obj.email;
    number.value = obj.number;
    date.value = obj.date;
    time.value = obj.time;
    let id = obj.id;
    list.removeChild(li);
    await axios
      .post(`http://localhost:4001/delete`, { id })
      .catch((err) => console.log(err));
    // submitbtn.addEventListener(
    //   "click",
    //   () => {
    //     let editedObj = {
    //       name: name1.value,
    //       email: email.value,
    //       number: number.value,
    //       date: date.value,
    //       time: time.value,
    //     };
    //     axios
    //       .put(`${url}/${id}`, editedObj)
    //       .then((res) => console.log(`${url}/${id}`));
    //   },
    //   { once: true }
    // );

    //localStorage.removeItem(obj.email);
  };
  li.appendChild(editbtn);
  li.appendChild(deletebtn);
  list.appendChild(li);
}
function showAllBookings() {
  list.innerHTML = "";
  axios
    .get("http://localhost:4001/get-users")
    .then((res) => {
      const data = res.data;
      for (let i = 0; i < data.length; i++) {
        showItems(data[i]);
      }
    })
    .catch((err) => console.log(err));
}

window.addEventListener("DOMContentLoaded", showAllBookings);
