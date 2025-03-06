export const branchesFilteredByName = (branches, filter) => {
  let defaultBranchesList = resetBranches(branches);
  defaultBranchesList = branches.map((branch) => {
    if (filter.length > 0) {
      if (!branch.branchName.toLowerCase().startsWith(filter.toLowerCase())) {
        branch.filtered = true;
      }
    }
    return branch;
  });
  return defaultBranchesList;
};

export const BranchesFilteredAscent = (branches) => {
  let arrayFiltered = branches.sort(function (a, b) {
    if (a.branchName < b.branchName) {
      return a?.filteredAsc ? -1 : 1;
    }
    if (a.branchName > b.branchName) {
      return a?.filteredAsc ? 1 : -1;
    }
    return 0;
  });

  arrayFiltered = branches.map((branch) => {
    branch.filteredAsc = branch?.filteredAsc ? false : true;
    return branch;
  });

  return arrayFiltered;
};
//reset branches array
const resetBranches = (arrayBranches) => {
  const resetBranch = arrayBranches.map((branch) => {
    if (branch?.filtered) {
      branch.filtered = false;
    }
  });
  return resetBranch;
};
