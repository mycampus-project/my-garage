import { Thing } from '@my-garage/common';

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

export default sortedThingArray;
