const toggleBtn = document.querySelector(".nav-toggle");
const Links = document.querySelector(".links");
const DarkMode = document.getElementById("dark-modetoggle");

toggleBtn.addEventListener("click", function () {
  Links.classList.toggle("show-links");
});

DarkMode.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

document.getElementById("search").addEventListener("submit", function (e) {
  e.preventDefault();
  const roomNumber = document.getElementById("room_number").value;

  fetch("find_roommates.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `room_number=${encodeURIComponent(roomNumber)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      const roommatesList = document.getElementById("roommatesList");
      roommatesList.innerHTML = "";

      if (data.status === "success") {
        data.data.forEach((roommate) => {
          const card = document.createElement("div");
          card.classList.add("roommate-card");
          card.innerHTML += `
                <img src="${roommate.profile_picture}" alt="Profile Picture" class="profile-pic">

                <p><strong>Name: </strong> ${roommate.first_name} ${roommate.surname}</p>

                <p><strong>Email: </strong> ${roommate.email} </p>

                <p><strong>Phone Number: </strong> ${roommate.phone_number} </p>

                <p><strong>Qualities: </strong> ${roommate.qualities} </p>

                <p><strong>Interests: </strong> ${roommate.interests} </p>

                <p class="room">${roommate.roomNumber}</p>
                `;
          roommatesList.appendChild(card);
        });
      } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = data.message;

        roommatesList.appendChild(errorMessage);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
