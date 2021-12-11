import { Thing, User } from '@my-garage/common';

function sortedThingArray(dataArray: Thing[], comparitor: string) {
  function compareByType(a: Thing, b: Thing) {
    if (a.type < b.type) {
      return -1;
    }
    if (a.type > b.type) {
      return 1;
    }
    return 0;
  }

  function compareByName(a: Thing, b: Thing) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  switch (comparitor) {
    case 'type':
      return dataArray.sort(compareByType);
    case 'name':
      return dataArray.sort(compareByName);
    default:
      return dataArray;
  }
}

function sortedUserArray(dataArray: User[], comparitor: string) {
  function compareByFullName(a: User, b: User) {
    if (a.fullName < b.fullName) {
      return -1;
    }
    if (a.fullName > b.fullName) {
      return 1;
    }
    return 0;
  }

  function compareByEmail(a: User, b: User) {
    if (a.email < b.email) {
      return -1;
    }
    if (a.email > b.email) {
      return 1;
    }
    return 0;
  }

  switch (comparitor) {
    case 'fullname':
      return dataArray.sort(compareByFullName);
    case 'email':
      return dataArray.sort(compareByEmail);
    default:
      return dataArray;
  }
}

export { sortedThingArray, sortedUserArray };
