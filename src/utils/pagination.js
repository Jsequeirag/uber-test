export function fs(itemsNumber) {
  try {
    if (typeof document === "undefined") {
      // during server evaluation
    } else {
      if (document.readyState !== "loading") {
        const content = document.getElementById("deliviriesTable");

        // borrar los botones de la paginacion
        let buttons = document.getElementById("pagination"); //  body.length === 0 ? console.log("no hay") : body.remove(body)
        if (buttons) {
          buttons.innerHTML = "";
        }

        const itemsPerPage = itemsNumber;
        var currentPage = 0;
        var nextButton = false;
        var pages = 0;
        const items = Array.from(content.getElementsByTagName("tr")).slice(1);

        function showPage(page) {
          const startIndex = page * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          items.forEach((item, index) => {
            item.classList.toggle(
              "hidden",
              index < startIndex || index >= endIndex
            );
          });
          !nextButton && updateActiveButtonStates();
        }

        function createPageButtons() {
          const totalPages = Math.ceil(items.length / itemsPerPage);
          const paginationContainer = document.getElementById("pagination");
          paginationContainer.setAttribute(
            "class",
            "flex items-center justify-center"
          );
          const text = document.createElement("p");
          text.innerText = "Páginas";
          paginationContainer.appendChild(text);
          text.className = "flex items-center justify-center";

          const afterButton = document.createElement("button");
          afterButton.innerText = "<";
          paginationContainer.appendChild(afterButton);
          afterButton.className =
            "flex justify-center item-center flex-col font-bold bg-blue-200 ml-2 rounded-full px-2 border shadow  ";

          afterButton.addEventListener("click", () => {
            const buttonList = document.querySelectorAll(".nextButton");
            buttonList.forEach((button, index) => {
              if (index - 1 >= 0) {
                if (button.classList.contains("active")) {
                  currentPage = index - 1;
                  nextButton = false;
                  showPage(currentPage);
                  updateActiveButtonStates();
                }
              }
            });
          });

          const beforeButton = document.createElement("button");
          beforeButton.innerText = ">";

          beforeButton.className =
            "flex justify-center item-center flex-col font-bold bg-blue-200 ml-2 rounded-full px-2 border shadow ";

          beforeButton.addEventListener("click", () => {
            const buttonList = document.querySelectorAll(".nextButton");
            for (let index = 0; index < buttonList.length; index++) {
              if (index < buttonList.length - 1) {
                if (buttonList[index].classList.contains("active")) {
                  nextButton = true;
                  buttonList[index].setAttribute(
                    "class",
                    `nextButton pagination-button bg-red-300 ml-2 rounded-full px-2 border shadow  ${
                      index >= 3 ? "hidden" : ""
                    }`
                  );
                  buttonList[index + 1].setAttribute(
                    "class",
                    "active nextButton pagination-button bg-black  text-white ml-2 rounded-full px-2 border shadow "
                  );
                  showPage(index + 1);
                  break;
                }
              }
            }
          });

          if (totalPages > 3) {
            for (let i = 0; i < totalPages; i++) {
              const pageButton = document.createElement("button");
              pageButton.className = "nextButton";
              pageButton.textContent = i + 1;
              //oculta los demás tabs
              pageButton.addEventListener("click", () => {
                currentPage = i;
                nextButton = false;
                showPage(currentPage);
                updateActiveButtonStates();
              });
              // content.prepend(paginationContainer);
              paginationContainer.appendChild(pageButton);
              paginationContainer.append(beforeButton);
              if (i === 2) {
                for (let index = 0; index < 3; index++) {
                  const pageButton = document.createElement("button");
                  pageButton.textContent = ".";
                  pageButton.setAttribute("class", " ml-1  ");
                  //   content.prepend(paginationContainer);
                  paginationContainer.appendChild(pageButton);
                  paginationContainer.append(beforeButton);
                }
              }
            }
          } else {
            for (let i = 0; i < totalPages; i++) {
              const pageButton = document.createElement("button");
              pageButton.className = "nextButton";
              pageButton.textContent = i + 1;
              pageButton.addEventListener("click", () => {
                currentPage = i;
                nextButton = false;
                showPage(currentPage);
                updateActiveButtonStates();
              });
              //  content.prepend(paginationContainer);
              paginationContainer.appendChild(pageButton);
              paginationContainer.append(beforeButton);
            }
            //text pagination
          }
        }

        function updateActiveButtonStates() {
          const pageButtons = document.querySelectorAll(".nextButton");
          pageButtons.forEach((button, index) => {
            if (index === currentPage) {
              button.setAttribute(
                "class",
                "active nextButton  pagination-button bg-black ml-2 rounded-full px-2 border shadow  text-white"
              );
            } else {
              button.setAttribute(
                "class",
                `nextButton pagination-button bg-gray-300 ml-2 rounded-full px-2 border shadow   ${
                  index < 3 || index === pageButtons.length - 1 ? "" : "hidden"
                }`
              );
            }
          });
        }

        createPageButtons(); // Call this function to create the page buttons initially
        showPage(currentPage);
      } else {
        alert("por aca");
      }
    }
  } catch (e) {
    console.log(e);
  }
}
