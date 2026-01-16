let elTeacherList: Element | null = document.querySelector(".teachers-list");
let elSearchInp: Element | null = document.querySelector(".search-inp");
let elCreateBtn: Element | null = document.querySelector(".create-btn");
let elStackSelect: Element | null = document.querySelector(".stack-select");


// Type start
interface TeacherType {
  id: "string";
  stackId: "string";
  stackName: "string";
  firstname: "string";
  lastname: "string";
  email: "string";
  phone: "string";
}
interface StackType{
    id?:string,
    name:string
}
// Type end

let BaseURL = "http://localhost:3000";
async function getRequest(url: string) {
  const res = await fetch(`${BaseURL}${url}`);
  const data = await res.json();
  return data;
}

// Teachers get all
let teachers:TeacherType[];
getRequest("/teachers").then((res) => {renderTeacher(res, elTeacherList);
    teachers = res
});

// Teachers render
function renderTeacher(arr: TeacherType[], list: Element) {
  list.innerHTML = null;
  arr.forEach((item: TeacherType, index: number) => {
    let elTr: HTMLTableRowElement = document.createElement("tr");
    elTr.innerHTML = `<td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px]"
                >
                  ${index + 1}
                </td>
                <td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px]"
                >
                  ${item.firstname}
                </td>
                <td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px]"
                >
                ${item.lastname}
                </td>
                <td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px]"
                >
                    ${item.email}
                </td>
                <td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px]"
                >
                    ${item.stackName}
                </td>
                <td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px]"
                >
                  Frontend
                </td>
                <td
                  class="text-center font-bold text-[15px] py-2 border-b-[1px] space-x-[10px]"
                >
                  <button>
                    <img
                      class="width-[20px] height-[20px]"
                      src="./img/edit.svg"
                      alt="edit"
                    />
                  </button>
                  <button>
                    <img
                      class="width-[25px] height-[25px]"
                      src="./img/trash.svg"
                      alt="edit"
                    />
                  </button>
                </td>`;
  });
}

// Search
elSearchInp.addEventListener("input", (evt) => {
    const filteredTeacher = teachers.filter(item => item.firstname.toLowerCase().includes((evt.target as HTMLInputElement).value.toLowerCase()))
    renderTeacher(filteredTeacher, elTeacherList);
    console.log("teachers");
})

// Create Teacher
elCreateBtn.addEventListener("click", () =>{
    const data = {
      id: "3",
      stackId: "5",
      stackName: "SMM",
      firstname: "Asad",
      lastname: "O'lmasov",
      email: "asad@gmail.com",
      phone: "+998889308676",
    };
    fetch(`${BaseURL}/teachers`,{
        method:"post",
        body:JSON.stringify(data)
    })
})


// Select stack
function renderStacks(arr: StackType[], list: Element) {
  list.innerHTML = null;
  arr.forEach((item: StackType) => {
    let elOption = document.createElement("option");
    elOption.value = item.id;
    elOption.textContent = item.name;
    list.appendChild(elOption);
  });
}

getRequest("/stacks").then((res) =>
  renderStacks([{name: "ALL" }, ...res], elStackSelect)
);
elStackSelect.addEventListener("change", (evt) => {
  const id = (evt.target as HTMLSelectElement).value;
  const query = id ? `?stackId=${id}` : "";
  getRequest(`/teachers${query}`).then((res) =>
    renderTeacher(res, elTeacherList)
  );
});
