const WITH_SPECIAL_CHARACTERS =
  'áãâäàÁÃÂÄÀéêëèÉÊËÈíîïìÍÎÏÌóõôöòÓÕÔÖÒúûüùÚÛÜÙñÑçÇ'.split('');

const WITHOUT_SPECIAL_CHARACTERS =
  'aaaaaAAAAAeeeeEEEEiiiiIIIIoooooOOOOOuuuuUUUUnNcC'.split('');

function helperGetTeamImageName(teamName) {
  return teamName
    .toLocaleLowerCase()
    .split('')
    .map(char => {
      if (char === ' ') {
        return '_';
      }
      const index = WITH_SPECIAL_CHARACTERS.indexOf(char);

      return index < 0 ? char : WITHOUT_SPECIAL_CHARACTERS[index];
    })
    .join('');
}

export { helperGetTeamImageName };
