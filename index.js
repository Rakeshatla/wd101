let userForm = document.getElementById("user-form");

const rebackEntries = () => {
  let entrie = localStorage.getItem("user-entries");
  if (entrie) {
    return JSON.parse(entrie);
  } else {
    return [];
  }
};

let userEntrie = rebackEntries();

const printEntries = () => {
  const entrie = rebackEntries();

  const tableEntrie = entrie.map((entry) => {
    const naamCell = `<td class='border px-4 py-2'>${entry.name}</td>`;
    const emaiCell = `<td class='border px-4 py-2'>${entry.email}</td>`;
    const passphraseCell = `<td class='border px-4 py-2'>${entry.password}</td>`;
    const dobirthCell = `<td class='border px-4 py-2'>${entry.dob}</td>`;
    const acceptTermsCell = `<td class='border px-4 py-2'>${entry.acceptedTermsAndconditions}</td>`;
    const row = `<tr>${naamCell}${emaiCell}${passphraseCell}${dobirthCell}${acceptTermsCell}</tr>`;
    return row;
  }).join("\n");

  const table = `<table class="table-auto w-full">
                  <tr>
                    <th class="px-4 py-2">name</th>
                    <th class="px-4 py-2">Email</th>
                    <th class="px-4 py-2">Password</th>
                    <th class="px-4 py-2">DOB</th>
                    <th class="px-4 py-2">Accepted Terms?</th>
                  </tr>
                  ${tableEntrie}
                </table>`;

  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};

const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTermsAndconditions = document.getElementById("acceptTerms").checked;
  const age = calculateAge(dob);
  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };
  userEntrie.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntrie));
  printEntries();
};

userForm.addEventListener("submit", saveUserForm);
printEntries();
