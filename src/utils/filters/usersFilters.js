export const usersFiltered = (users, filter, propertyName) => {
  let defaultUsersList = resetUser(users);
  defaultUsersList = users.map((user) => {
    if (filter.length > 0 && filter !== "allOptions") {
      if (!user[propertyName].toLowerCase().startsWith(filter.toLowerCase())) {
        user.filtered = true;
      }
    }
    return user;
  });
  return defaultUsersList;
};

const resetUser = (arrayUsers) => {
  const resetUser = arrayUsers.map((user) => {
    if (user?.filtered) {
      user.filtered = false;
    }
  });
  return resetUser;
};
export const usersFilteredAscent = (users, propertyName) => {
  let arrayFiltered = users.sort(function (a, b) {
    if (a[propertyName] < b[propertyName]) {
      return a?.filteredAsc ? -1 : 1;
    }
    if (a[propertyName] > b[propertyName]) {
      return a?.filteredAsc ? 1 : -1;
    }
    return 0;
  });

  arrayFiltered = users.map((user) => {
    user.filteredAsc = user?.filteredAsc ? false : true;
    return user;
  });

  return arrayFiltered;
};
