module.exports={
  filterExtra
}

function filterExtra(a, b) {
  const d0 = {...a, ...b };
  const o = {};
  // return a clean copy
  Object.keys(a).forEach(key => {
    // include original keys
    o[key] = d0[key]
  });
  return o;
}
