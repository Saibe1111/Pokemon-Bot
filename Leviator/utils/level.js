module.exports.getXpAndLevel = (totalOfXp) => {
  let level = null;
  let level_test = 1;
  let xp_test = null;
  let xp_OLD = null;

  while (level === null) {
    xp_OLD = xp_test;
    xp_test += (5 * (level_test - 1) * level_test + 50 * (level_test - 1) + 100) / 20;

    if (totalOfXp < Math.ceil(xp_test)) {
      level = level_test - 1;
    }

    level_test += 1;
  }
  xp_test = Math.ceil(xp_test) - Math.ceil(xp_OLD)
  xp_OLD = Math.ceil(totalOfXp) - Math.ceil(xp_OLD)
  return [level, xp_OLD, xp_test];
}
