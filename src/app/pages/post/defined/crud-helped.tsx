import _ from 'lodash';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CompareDate } from './const';

export const notifyError = (error: string) => {
  toast.error(error, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const notifySuccess = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export const diff = (obj1: any, obj2: any) => {
  if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
    return obj1;
  }

  let diffs: any = {};
  let key;

  let arraysMatch = function(arr1: any, arr2: any) {

    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  };

  let compare = function(item1: any, item2: any, key: any) {

    let type1 = Object.prototype.toString.call(item1);
    let type2 = Object.prototype.toString.call(item2);

    // if (type2 === '[object Undefined]') {
    //   diffs[key] = null;
    //   return;
    // }

    if (type1 !== type2) {
      diffs[key] = item2;
      return;
    }

    if (type1 === '[object Object]') {
      let objDiff: any = diff(item1, item2);
      if (Object.keys(objDiff).length > 0) {
        diffs[key] = objDiff;
      }
      return;
    }

    if (type1 === '[object Array]') {
      if (!arraysMatch(item1, item2)) {
        diffs[key] = item2;
      }
      return;
    }

    if (type1 === '[object Function]') {
      if (item1.toString() !== item2.toString()) {
        diffs[key] = item2;
      }
    } else {
      if (item1 !== item2) {
        diffs[key] = item2;
      }
    }
  };

  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      compare(obj1[key], obj2[key], key);
    }
  }

  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  return diffs;
};

export const validField = [
  'harvesting',
  'preliminaryTreatment',
  'cleaning',
  'packing',
  'preservation',
  'unit'
];

export const validNested = [
  'estimatedTime',
  'estimatedQuantity',
  'technical',
  'leader',
  'estimatedExpireTimeStart',
  'estimatedExpireTimeEnd',
  'packing',
  'estimatedStartTime',
  'estimatedEndTime',
  'unit'
];

export const validationForm = (values: any) => {
    const errors: any = {};

    console.log(values);

    const unit = values.unit

    const harvestingLeader = values.harvesting?.leader;
    const harvestingTechnical = values.harvesting?.technical;

    const ptEstimatedTime = values.preliminaryTreatment?.estimatedTime;
    const ptEstimatedQuantity = values.preliminaryTreatment?.estimatedQuantity;
    const ptLeader = values.preliminaryTreatment?.leader;
    const ptTechnical = values.preliminaryTreatment?.technical;

    const cleaningEstimatedTime = values.cleaning?.estimatedTime;
    const cleaningEstimatedQuantity = values.cleaning?.estimatedQuantity;
    const cleaningLeader = values.cleaning?.leader;
    const cleaningTechnical = values.cleaning?.technical;

    const packingEstimatedTime = values.packing?.estimatedTime;
    const packingEstimatedExpireTimeStart = values.packing?.estimatedExpireTimeStart;
    const packingEstimatedExpireTimeEnd = values.packing?.estimatedExpireTimeEnd;
    const packingPacking = values.packing?.packing;
    const packingEstimatedQuantity = values.packing?.estimatedQuantity;
    const packingTechnical = values.packing?.technical;
    const packingLeader = values.packing?.leader;

    const preservationEstimatedStartTime = values.preservation?.estimatedStartTime;
    const preservationEstimatedEndTime = values.preservation?.estimatedEndTime;
    const preservationTechnical = values.preservation?.technical;

    // ---------------------------------------------------------------

    // if (harvestingLeader?.length === 0 && harvestingTechnical?.length > 0) {
    //   if (!errors.harvesting) {
    //     errors.harvesting = {};
    //   }
    //   errors.harvesting.leader = 'T??? tr?????ng thu ho???ch kh??ng ???????c b??? tr???ng';
    // }

    // if (harvestingTechnical?.length === 0 && harvestingLeader?.length > 0) {
    //   if (!errors.harvesting) {
    //     errors.harvesting = {};
    //   }
    //   errors.harvesting.technical = 'Nh??n vi??n k??? thu???t thu ho???ch kh??ng ???????c b??? tr???ng';
    // }

    // ---------------------------------------------------------------

    // if (
    //   !ptEstimatedTime &&
    //   (ptEstimatedQuantity || ptLeader?.length > 0 || ptTechnical?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.estimatedTime = 'Th???i gian s?? ch??? kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   !ptEstimatedQuantity &&
    //   (ptEstimatedTime || ptLeader?.length > 0 || ptTechnical?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.estimatedQuantity = 'S???n l?????ng s?? ch??? kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   ptLeader?.length === 0 &&
    //   (ptEstimatedTime || ptEstimatedQuantity || ptTechnical?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.leader = 'T??? tr?????ng s?? ch??? kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   ptTechnical?.length === 0 &&
    //   (ptEstimatedTime || ptEstimatedQuantity || ptLeader?.length > 0)
    // ) {
    //   if (!errors.preliminaryTreatment) {
    //     errors.preliminaryTreatment = {};
    //   }
    //   errors.preliminaryTreatment.technical = 'Nh??n vi??n k??? thu???t s?? ch??? kh??ng ???????c b??? tr???ng';
    // }

    // ---------------------------------------------------------------

    // if (
    //   !cleaningEstimatedTime &&
    //   (cleaningEstimatedQuantity || cleaningLeader?.length > 0 || cleaningTechnical?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.estimatedTime = 'Th???i gian l??m s???ch kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   !cleaningEstimatedQuantity &&
    //   (cleaningEstimatedTime || cleaningLeader?.length > 0 || cleaningTechnical?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.estimatedQuantity = 'S???n l?????ng l??m s???ch kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   cleaningLeader?.length === 0 &&
    //   (cleaningEstimatedTime || cleaningEstimatedQuantity || cleaningTechnical?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.leader = 'T??? tr?????ng l??m s???ch kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   cleaningTechnical?.length === 0 &&
    //   (cleaningEstimatedTime || cleaningEstimatedQuantity || cleaningLeader?.length > 0)
    // ) {
    //   if (!errors.cleaning) {
    //     errors.cleaning = {};
    //   }
    //   errors.cleaning.technical = 'Nh??n vi??n k??? thu???t l??m s???ch kh??ng ???????c b??? tr???ng';
    // }

    // ---------------------------------------------------------------

    // if (
    //   !packingEstimatedTime &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedTime = 'Th???i gian ????ng g??i kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   !packingEstimatedExpireTimeStart &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedTime ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedExpireTimeStart = 'H???n s??? d???ng kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   !packingEstimatedExpireTimeEnd &&
    //   (packingEstimatedTime ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedExpireTimeEnd = 'Ng??y h???t h???n kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   !packingPacking &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingEstimatedTime ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.packing = 'Quy c??ch ????ng g??i kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   !packingEstimatedQuantity &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedTime ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.estimatedQuantity = 'S??? l?????ng ????ng g??i kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   packingTechnical?.length === 0 &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingLeader?.length > 0 ||
    //     packingPacking ||
    //     packingEstimatedTime)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.technical = 'KCS kh??ng ???????c b??? tr???ng';
    // }

    // if (
    //   packingLeader?.length === 0 &&
    //   (packingEstimatedExpireTimeEnd ||
    //     packingEstimatedExpireTimeStart ||
    //     packingEstimatedQuantity ||
    //     packingEstimatedTime ||
    //     packingPacking ||
    //     packingTechnical?.length > 0)
    // ) {
    //   if (!errors.packing) {
    //     errors.packing = {};
    //   }
    //   errors.packing.leader = 'T??? tr?????ng ????ng g??i kh??ng ???????c b??? tr???ng';
    // }

    // ---------------------------------------------------------------

    // if (!unit) {
    //   if (!errors.unit) {
    //     errors.unit = {};
    //   }
    //   errors.unit[''] = 'Vui l??ng ch???n ????n v??? t??nh';
    // }

    if (ptEstimatedQuantity) {
      if (!_.isInteger(ptEstimatedQuantity)) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedQuantity = 'S???n l?????ng s?? ch??? ph???i l?? s??? nguy??n';
      } else if (ptEstimatedQuantity < 0) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedQuantity = 'S???n l?????ng s?? ch??? kh??ng ???????c nh??? h??n 0';
      } else if (
        values.planting?.expectedQuantity &&
        ptEstimatedQuantity > values.planting?.expectedQuantity
      ) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedQuantity =
          'S???n l?????ng s?? ch??? kh??ng ???????c l???n h??n s???n l?????ng thu ho???ch';
      }
    }

    if (ptEstimatedTime) {
      if (!CompareDate(new Date(ptEstimatedTime), new Date())) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedTime = 'Ng??y s?? ch??? kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        values.planting?.estimatedHarvestTime &&
        !CompareDate(new Date(ptEstimatedTime), new Date(values.planting?.estimatedHarvestTime))
      ) {
        if (!errors.preliminaryTreatment) {
          errors.preliminaryTreatment = {};
        }
        errors.preliminaryTreatment.estimatedTime = 'Ng??y s?? ch??? kh??ng ???????c nh??? h??n ng??y thu ho???ch';
      }
    }

    // Cleaning

    if (cleaningEstimatedQuantity) {
      if (!_.isInteger(cleaningEstimatedQuantity)) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedQuantity = 'S???n l?????ng l??m s???ch ph???i l?? s??? nguy??n';
      } else if (cleaningEstimatedQuantity < 0) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedQuantity = 'S???n l?????ng l??m s???ch kh??ng ???????c nh??? h??n 0';
      } else if (ptEstimatedQuantity && cleaningEstimatedQuantity > ptEstimatedQuantity) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedQuantity =
          'S???n l?????ng l??m s???ch kh??ng ???????c l???n h??n s???n l?????ng s?? ch???';
      }
    }

    if (cleaningEstimatedTime) {
      if (!CompareDate(new Date(cleaningEstimatedTime), new Date())) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedTime = 'Ng??y l??m s???ch kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        ptEstimatedTime &&
        !CompareDate(new Date(cleaningEstimatedTime), new Date(ptEstimatedTime))
      ) {
        if (!errors.cleaning) {
          errors.cleaning = {};
        }
        errors.cleaning.estimatedTime = 'Ng??y l??m s???ch kh??ng ???????c nh??? h??n ng??y s?? ch???';
      }
    }

    // Packing

    if (values.packing && packingEstimatedQuantity && !_.isInteger(packingEstimatedQuantity)) {
      if (!errors.packing) {
        errors.packing = {};
      }
      errors.packing.estimatedQuantity = 'S??? l?????ng ????ng g??i ph???i l?? s??? nguy??n';
    } else if (values.packing && packingEstimatedQuantity && packingEstimatedQuantity < 0) {
      if (!errors.packing) {
        errors.packing = {};
      }
      errors.packing.estimatedQuantity = 'S??? l?????ng ????ng g??i kh??ng ???????c nh??? h??n 0';
    }

    if (packingEstimatedTime) {
      if (!CompareDate(new Date(packingEstimatedTime), new Date())) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedTime = 'Ng??y ????ng g??i kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        cleaningEstimatedTime &&
        !CompareDate(new Date(packingEstimatedTime), new Date(cleaningEstimatedTime))
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedTime = 'Ng??y ????ng g??i kh??ng ???????c nh??? h??n ng??y l??m s???ch';
      } else if (
        packingEstimatedExpireTimeStart &&
        CompareDate(new Date(packingEstimatedTime), new Date(packingEstimatedExpireTimeStart))
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedTime = 'Ng??y ????ng g??i kh??ng ???????c l???n h??n h???n s??? d???ng b???t ?????u';
      }
    }

    if (packingEstimatedExpireTimeStart) {
      if (!CompareDate(new Date(packingEstimatedExpireTimeStart), new Date())) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeStart = 'H???n s??? d???ng kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        packingEstimatedTime &&
        CompareDate(new Date(packingEstimatedTime), new Date(packingEstimatedExpireTimeStart))
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeStart =
          'H???n s??? d???ng b???t ?????u kh??ng ???????c nh??? h??n ng??y ????ng g??i';
      } else if (
        values.packing.estimatedExpireTimeEnd &&
        !CompareDate(
          new Date(packingEstimatedExpireTimeEnd),
          new Date(packingEstimatedExpireTimeStart),
        )
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeStart =
          'H???n s??? d???ng b???t ?????u kh??ng ???????c l???n h??n ng??y h???t h???n';
      }
    }

    if (packingEstimatedExpireTimeEnd) {
      if (!CompareDate(new Date(packingEstimatedExpireTimeEnd), new Date())) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeEnd = 'Ng??y h???t h???n kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        packingEstimatedExpireTimeStart &&
        !CompareDate(
          new Date(packingEstimatedExpireTimeEnd),
          new Date(packingEstimatedExpireTimeStart),
        )
      ) {
        if (!errors.packing) {
          errors.packing = {};
        }
        errors.packing.estimatedExpireTimeEnd =
          'Ng??y h???t h???n kh??ng ???????c nh??? h??n h???n s??? d???ng b???t ?????u';
      }
    }

    // Preservation

    if (preservationEstimatedStartTime) {
      if (!CompareDate(new Date(preservationEstimatedStartTime), new Date())) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedStartTime = 'Ng??y b???o qu???n kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        packingEstimatedTime &&
        CompareDate(new Date(packingEstimatedTime), new Date(preservationEstimatedStartTime))
      ) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedStartTime =
          'Ng??y b???t ?????u b???o qu???n kh??ng ???????c nh??? h??n ng??y ????ng g??i';
      } else if (
        preservationEstimatedEndTime &&
        !CompareDate(
          new Date(preservationEstimatedEndTime),
          new Date(preservationEstimatedStartTime),
        )
      ) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedStartTime =
          'Ng??y b???t ?????u b???o qu???n kh??ng ???????c l???n h??n ng??y k???t th??c b???o qu???n';
      }
    }

    if (preservationEstimatedEndTime) {
      if (!CompareDate(new Date(preservationEstimatedEndTime), new Date())) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedEndTime =
          'Ng??y k???t th??c b???o qu???n kh??ng ???????c nh??? h??n ng??y hi???n t???i';
      } else if (
        preservationEstimatedStartTime &&
        !CompareDate(
          new Date(preservationEstimatedEndTime),
          new Date(preservationEstimatedStartTime),
        )
      ) {
        if (!errors.preservation) {
          errors.preservation = {};
        }
        errors.preservation.estimatedEndTime =
          'Ng??y k???t th??c b???o qu???n kh??ng ???????c nh??? h??n ng??y b???t ?????u b???o qu???n';
      }
    }

    return errors;
  };
