export const BranchDto = (Branches) => {
  let branchesArray = [];

  for (const [key, value] of Object.entries(Branches)) {
    console.log(`${key}: ${value}`);
    let branch = { name: key, status: value.status, id: value.id };
    branchesArray.push(branch);
  }
  console.log(branchesArray);
  return branchesArray;
};
